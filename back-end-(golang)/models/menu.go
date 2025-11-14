package models

import "time"

type Menu struct {
	ID         uint      `gorm:"primaryKey;autoIncrement"`
	Name       string    `gorm:"type:varchar(100);not null"`
	Category   string    `gorm:"type:enum('makanan','minuman');not null"`
	HargaJual  float64   `gorm:"type:decimal(10,2);not null"`
	HargaPokok float64   `gorm:"type:decimal(10,2);not null"`
	Status     string    `gorm:"type:enum('aktif','nonaktif');default:'aktif'"`
	CreatedAt  time.Time `gorm:"autoCreateTime"`
}
