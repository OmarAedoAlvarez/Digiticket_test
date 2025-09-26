package com.digiticket.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "administrators",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_admins_user_id", columnNames = "user_id"),
                @UniqueConstraint(name = "uq_admins_code", columnNames = "admin_code")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Administrator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Relación 1:1 con User
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            unique = true,
            foreignKey = @ForeignKey(name = "fk_admins_users")
    )
    private User user;

    @Column(name = "admin_code", nullable = false, length = 32)
    private String adminCode;

    // Relación con otro administrador (created_by_admin)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "created_by_admin",
            foreignKey = @ForeignKey(name = "fk_admins_created_by")
    )
    private Administrator createdByAdmin;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
