import { useState, useEffect } from 'react'

export function useImagePreloader(imagePaths) {
    const [imagesLoaded, setImagesLoaded] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [loadedImages, setLoadedImages] = useState([])

    useEffect(() => {
        if (!imagePaths || imagePaths.length === 0) {
            setIsLoaded(true)
            return
        }

        let loadedCount = 0
        const images = []

        // Create image objects for all paths
        imagePaths.forEach((path, index) => {
            const img = new Image()
            img.src = path

            img.onload = () => {
                loadedCount++
                setImagesLoaded(loadedCount)
                if (loadedCount === imagePaths.length) {
                    setIsLoaded(true)
                }
            }

            img.onerror = () => {
                // Even if error, we count it to avoid hanging
                console.error(`Failed to load image: ${path}`)
                loadedCount++
                setImagesLoaded(loadedCount)
                if (loadedCount === imagePaths.length) {
                    setIsLoaded(true)
                }
            }

            images[index] = img
        })

        setLoadedImages(images)

        return () => {
            // Cleanup if needed? Usually not for simple preloader
        }
    }, [imagePaths]) // Run only when paths change (usually once)

    const progress = imagePaths.length > 0 ? (imagesLoaded / imagePaths.length) * 100 : 0

    return { isLoaded, progress, loadedImages }
}
