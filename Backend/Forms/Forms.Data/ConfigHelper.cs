using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;

namespace Forms.Data
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

        internal static string GetName(string value)
        {
            if (string.IsNullOrEmpty(value)) return value;
            var i = value.IndexOf('.');
            return i < 0 ? value : value.Substring(i + 1);
        }

        internal static string GetSchema(string value)
        {
            if (string.IsNullOrEmpty(value)) return "dbo";
            var i = value.IndexOf('.');
            return i < 0 ? "dbo" : value.Substring(0, i);
        }

        internal EntityTypeBuilder<T> Entity()
        {
            return Builder.Entity<T>();
        }

        internal void HasKey([NotNull] Expression<Func<T, object>> keyExpression)
        {
            Builder.Entity<T>().HasKey(keyExpression);
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

        internal void DefaultValue<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, object defaultValue, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasDefaultValue(defaultValue)
                .IsRequired(required);
        }

        internal void VarChar<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, int len, bool required)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(len)
                .IsUnicode(false)
                .IsRequired(required);
        }

        internal void IsRequired<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .IsRequired(required);
        }

        internal void NVarChar<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, int len, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(len)
                .IsUnicode(true)
                .IsRequired(required);
        }




        internal void DefineProjectId<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(20)
                .IsUnicode(false)
                .IsRequired();
        }

        internal void DefineTitle<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(150)
                .IsUnicode(true)
                .IsRequired();
        }

        internal void DefineGroupCode<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsRequired();
        }

        internal void DefineName<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasMaxLength(50)
                .IsUnicode(false)
                .IsRequired();
        }

        internal void DefineDescription<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression)
        {
            Builder.Entity<T>().Property(propertyExpression)
                    .HasMaxLength(2000)
                    .IsUnicode(true);
        }

        internal void DefineCreatedAt<TProperty>([NotNull] Expression<Func<T, TProperty>> propertyExpression, bool required = true)
        {
            Builder.Entity<T>().Property(propertyExpression)
                .HasDefaultValueSql("getdate()")
                .IsRequired(required);
        }

    }
}