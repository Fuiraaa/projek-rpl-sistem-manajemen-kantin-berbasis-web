package config

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// Konfigurasi koneksi ke MySQL
	dbUser := "root"       // ganti sesuai username MySQL kamu
	dbPass := ""           // kalau pakai password isi di sini
	dbHost := "127.0.0.1"  // localhost
	dbPort := "3306"       // port default MySQL
	dbName := "kantinagus"  // nama database kamu

	// Format DSN (Data Source Name)

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser, dbPass, dbHost, dbPort, dbName)

	// Hubungkan ke database pakai GORM 
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("❌ Gagal konek ke database: %v", err)
		os.Exit(1)
	}

	log.Println("✅ Database terkoneksi dengan sukses!")
	
}
