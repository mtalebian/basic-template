using Accounts.Core;
using Common.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;

namespace Accounts.Data
{
    public class ConfigHelper<T> where T : class
    {
        private ModelBuilder Builder;



        public ConfigHelper(ModelBuilder modelBuilder, string tableName)
        {
            Builder = modelBuilder;
            Builder.Entity<T>()
                .ToTable(GetName(tableName), GetSchema(tableName));
        }

        internal void HasKey([NotNull] Expression<Func<T, object>> keyExpression)
        {
            Builder.Entity<T>().HasKey(keyExpression);
        }

        internal void DefineTitle<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(150)
                .IsRequired();
        }

        internal EntityTypeBuilder<T> Entity()
        {
            return Builder.Entity<T>();
        }
        
        internal PropertyBuilder<TProperty> Property<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            return Builder.Entity<T>().Property(propertyExpression);
        }
        
        internal void IsAutoIncrement<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .ValueGeneratedOnAdd()
                .IsRequired();
        }

        internal void DefineUserName<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(100)
                .IsRequired(required);
        }

        internal void DefineUrl<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(250)
                .IsRequired(required);
        }

        internal void DefaultGetDate<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasDefaultValueSql("getdate()")
                .IsRequired(required);
        }

        internal void DefaultValue<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, object defaultValue, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasDefaultValue(defaultValue)
                .IsRequired(required);
        }

        internal void HasMaxLength<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, int maxLen, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(maxLen)
                .IsRequired(required);
        }
        
        internal void Varchar100<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(100)
                .IsRequired(required);
        }

        internal void Varchar50<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(50)
                .IsRequired(required);
        }

        internal void Varchar20<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(20)
                .IsRequired(required);
        }

        internal void Varchar10<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(10)
                .IsRequired(required);
        }

        internal void IsRequired<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .IsRequired();
        }

        internal void DefineProjectId<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(30)
                .IsRequired();
        }

        internal void DefineMenuFolderId<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, bool required=true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(30)
                .IsRequired(required);
        }

        internal void DefineMenuId<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(30)
                .IsRequired();
        }

        internal void DefineCompositeRoleId<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(50)
                .IsRequired();
        }

        internal void DefineRoleId<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(50)
                .IsRequired();
        }

        internal void DefineIP<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(20)
                .IsRequired();
        }

        internal void DefineApplicationId<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(20)
                .IsRequired();
        }

        internal void DefineObjectId<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(30)
                .IsRequired();
        }

        internal void DefineFieldId<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(30)
                .IsRequired();
        }

        private string GetName(string value)
        {
            if (string.IsNullOrEmpty(value)) return value;
            var i = value.IndexOf('.');
            return i < 0 ? value : value.Substring(i + 1);
        }

        private string GetSchema(string value)
        {
            if (string.IsNullOrEmpty(value)) return "dbo";
            var i = value.IndexOf('.');
            return i < 0 ? "dbo" : value.Substring(0, i);
        }
    }
}