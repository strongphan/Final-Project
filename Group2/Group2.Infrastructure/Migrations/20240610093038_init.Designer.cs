﻿// <auto-generated />
using System;
using Group2.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Group2.Infrastructure.Migrations
{
    [DbContext(typeof(AssetContext))]
    [Migration("20240610093038_init")]
    partial class init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Group2.Domain.Entity.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("ModifiedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("ModifiedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("d999eefb-7869-4ced-b21d-be5f5c3597cb"),
                            CreatedAt = new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8530),
                            Email = "user1@example.com",
                            ModifiedAt = new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8548),
                            Name = "user1",
                            Password = "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i",
                            Role = 0
                        },
                        new
                        {
                            Id = new Guid("f27fc38a-046b-44fd-8091-ad98939c6310"),
                            CreatedAt = new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8555),
                            Email = "user2@example.com",
                            ModifiedAt = new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8555),
                            Name = "user2",
                            Password = "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i",
                            Role = 0
                        },
                        new
                        {
                            Id = new Guid("de969699-763b-407d-a86b-a615a427fbe9"),
                            CreatedAt = new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8558),
                            Email = "admin@example.com",
                            ModifiedAt = new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8558),
                            Name = "admin",
                            Password = "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i",
                            Role = 1
                        },
                        new
                        {
                            Id = new Guid("466db3c8-8f3f-4923-8346-733b8990690f"),
                            CreatedAt = new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8560),
                            Email = "user3@example.com",
                            ModifiedAt = new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8561),
                            Name = "user3",
                            Password = "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i",
                            Role = 0
                        },
                        new
                        {
                            Id = new Guid("8163ba0d-8552-4503-b3fd-ac8fda07c1bb"),
                            CreatedAt = new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8562),
                            Email = "user4@example.com",
                            ModifiedAt = new DateTime(2024, 6, 10, 16, 30, 37, 692, DateTimeKind.Local).AddTicks(8563),
                            Name = "user4",
                            Password = "$2a$12$0NPISodxxD/AH/OGrKghM.xTFgZHmg1MZlDC.FJo6SS7gYSdhdo9i",
                            Role = 0
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
