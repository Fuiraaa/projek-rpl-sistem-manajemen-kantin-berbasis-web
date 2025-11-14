package models

import "time"

type User struct {
	ID        uint      `gorm:"primaryKey;autoIncrement"`
	Username  string    `gorm:"type:varchar(100);not null"`
	Email     *string   `gorm:"type:varchar(100)"`
	Password  string    `gorm:"type:varchar(255);not null"`
	Role      string    `gorm:"type:enum('admin','owner','karyawan');default:'admin'"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
}
