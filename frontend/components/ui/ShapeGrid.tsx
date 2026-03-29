'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface ShapeGridProps {
  speed?: number
  squareSize?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal'
  borderColor?: string
  hoverFillColor?: string
  shape?: 'square' | 'hexagon' | 'circle' | 'triangle'
  hoverTrailAmount?: number
}

interface HoveredCell {
  row: number
  col: number
  opacity: number
}

export default function ShapeGrid({
  speed = 0.5,
  squareSize = 40,
  direction = 'diagonal',
  borderColor = '#271E37',
  hoverFillColor = '#222222',
  shape = 'square',
  hoverTrailAmount = 0,
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const offsetRef = useRef({ x: 0, y: 0 })
  const [hoveredCells, setHoveredCells] = useState<HoveredCell[]>([])

  const getOffset = useCallback(() => {
    const time = Date.now() * speed * 0.01
    switch (direction) {
      case 'up':
        return { x: 0, y: -time % squareSize }
      case 'down':
        return { x: 0, y: time % squareSize }
      case 'left':
        return { x: -time % squareSize, y: 0 }
      case 'right':
        return { x: time % squareSize, y: 0 }
      case 'diagonal':
      default:
        return { x: time % squareSize, y: time % squareSize }
    }
  }, [direction, speed, squareSize])

  const drawShape = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    fillColor: string | null,
    strokeColor: string
  ) => {
    ctx.beginPath()
    
    switch (shape) {
      case 'circle':
        ctx.arc(x + size / 2, y + size / 2, size / 2 - 1, 0, Math.PI * 2)
        break
      case 'hexagon':
        const hexSize = size / 2 - 1
        const centerX = x + size / 2
        const centerY = y + size / 2
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6
          const hx = centerX + hexSize * Math.cos(angle)
          const hy = centerY + hexSize * Math.sin(angle)
          if (i === 0) ctx.moveTo(hx, hy)
          else ctx.lineTo(hx, hy)
        }
        ctx.closePath()
        break
      case 'triangle':
        ctx.moveTo(x + size / 2, y + 2)
        ctx.lineTo(x + size - 2, y + size - 2)
        ctx.lineTo(x + 2, y + size - 2)
        ctx.closePath()
        break
      case 'square':
      default:
        ctx.rect(x, y, size, size)
        break
    }
    
    if (fillColor) {
      ctx.fillStyle = fillColor
      ctx.fill()
    }
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 0.5
    ctx.stroke()
  }, [shape])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)

    const offset = getOffset()
    offsetRef.current = offset

    const cols = Math.ceil(width / squareSize) + 2
    const rows = Math.ceil(height / squareSize) + 2

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const x = col * squareSize + (offset.x % squareSize)
        const y = row * squareSize + (offset.y % squareSize)

        const hoveredCell = hoveredCells.find(
          cell => cell.row === row && cell.col === col
        )

        const fillColor = hoveredCell
          ? `rgba(34, 34, 34, ${hoveredCell.opacity})`
          : null

        drawShape(ctx, x, y, squareSize, fillColor, borderColor)
      }
    }

    animationRef.current = requestAnimationFrame(draw)
  }, [squareSize, borderColor, hoveredCells, getOffset, drawShape])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      const parent = canvas.parentElement
      if (parent) {
        const rect = parent.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [draw])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const offset = offsetRef.current
    const col = Math.floor((x - (offset.x % squareSize)) / squareSize)
    const row = Math.floor((y - (offset.y % squareSize)) / squareSize)

    setHoveredCells(prev => {
      const newCells: HoveredCell[] = [{ row, col, opacity: 1 }]
      
      if (hoverTrailAmount > 0) {
        prev.forEach(cell => {
          if (cell.row !== row || cell.col !== col) {
            const newOpacity = cell.opacity - (1 / (hoverTrailAmount + 1))
            if (newOpacity > 0.1) {
              newCells.push({ ...cell, opacity: newOpacity })
            }
          }
        })
      }
      
      return newCells.slice(0, hoverTrailAmount + 1)
    })
  }, [squareSize, hoverTrailAmount])

  const handleMouseLeave = useCallback(() => {
    setHoveredCells([])
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0.6 }}
    />
  )
}
