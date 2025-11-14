package main

import (
	"KantinAgus/config"
	"KantinAgus/routes"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Koneksi database
	config.ConnectDatabase()

	// 2. Buat router utama
	router := gin.Default()

	// 3. Panggil semua route dari folder routes
	routes.SetupRoutes(router)

	// 4. Jalankan server di port 8080
	log.Println("🚀 Server berjalan di http://localhost:8080")
	router.Run(":8080")
}
