using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Common.Data
{
    public class BaseConfig<T> where T : class
    {
        private ModelBuilder modelBuilder;



        public BaseConfig(ModelBuilder modelBuilder, string tableName)
        {
            this.modelBuilder = modelBuilder;

            modelBuilder.Entity<T>()
                .ToTable(GetName(tableName), GetSchema(tableName));
        }

        public EntityTypeBuilder<T> Entity()
        {
           return modelBuilder.Entity<T>();
        }

        public void HasKey([NotNullAttribute] Expression<Func<T, object>> keyExpression)
        {
            modelBuilder.Entity<T>().HasKey(keyExpression);
        }

        public PropertyBuilder<TProperty> Property<TProperty>([NotNullAttribute] Expression<Func<T, TProperty>> propertyExpression)
        {
            return modelBuilder.Entity<T>().Property(propertyExpression);
        }

        public PropertyBuilder<TProperty> IsAutoIncrement<TProperty>([NotNullAttribute] Expression<Func<T, TProperty>> propertyExpression)
        {
            return Property(propertyExpression).ValueGeneratedOnAdd();
        }

        public PropertyBuilder<TProperty> IsRequired<TProperty>([NotNullAttribute] Expression<Func<T, TProperty>> propertyExpression)
        {
            return Property(propertyExpression).IsRequired();
        }

        


        public string GetName(string value)
        {
            if (string.IsNullOrEmpty(value)) return value;
            var i = value.IndexOf('.');
            return i < 0 ? value : value.Substring(i + 1);
        }

        public string GetSchema(string value)
        {
            if (string.IsNullOrEmpty(value)) return "dbo";
            var i = value.IndexOf('.');
            return i < 0 ? "dbo" : value.Substring(0, i);
        }

    }
}