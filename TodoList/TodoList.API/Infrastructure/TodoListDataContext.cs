using System.Data.Entity;
using System.Data.Entity.Design.PluralizationServices;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Globalization;
using TodoList.API.Models;

namespace TodoList.API.Infrastructure
{
    public class TodoListDataContext : DbContext
    {
        public TodoListDataContext() : base("TodoList")
        {

        }

        public IDbSet<Todo> Todos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Entity<Todo>()
                .ToTable("Todos");
        }
    }
}