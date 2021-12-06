using Common.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;

namespace Common.Data
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

        public void HasKey([NotNull] Expression<Func<T, object>> keyExpression)
        {
            Builder.Entity<T>().HasKey(keyExpression);
        }

        public void DefineTitle<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(150)
                .IsRequired();
        }

        public EntityTypeBuilder<T> Entity()
        {
            return Builder.Entity<T>();
        }
        
        public PropertyBuilder<TProperty> Property<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            return Builder.Entity<T>().Property(propertyExpression);
        }
        
        public void IsAutoIncrement<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .ValueGeneratedOnAdd()
                .IsRequired();
        }

        public void DefaultValue<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, object defaultValue, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasDefaultValue(defaultValue)
                .IsRequired(required);
        }

        public void HasMaxLength<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, int maxLen, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(maxLen)
                .IsRequired(required);
        }

        
        public void Char<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, int maxLen, bool required)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(maxLen)
                .IsRequired(required);
        }

        public void NChar<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, int maxLen, bool required)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(maxLen)
                .IsUnicode(true)
                .IsRequired(required);
        }
        
        public void VarChar<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, int maxLen, bool required )
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(maxLen)
                .IsRequired(required);
        }

        public void NVarChar<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, int maxLen, bool required )
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(maxLen)
                .IsUnicode(true)
                .IsRequired(required);
        }

        public void VarBinary<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, int maxLen, bool required)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(maxLen)
                .IsRequired(required);
        }

        public void IsRequired<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
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