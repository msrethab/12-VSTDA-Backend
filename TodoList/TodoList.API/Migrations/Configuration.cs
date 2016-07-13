namespace TodoList.API.Migrations
{
    using Models;
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<TodoList.API.Infrastructure.TodoListDataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        //Seeds database with sample todos

        protected override void Seed(TodoList.API.Infrastructure.TodoListDataContext context)
        {
            context.Todos.AddOrUpdate(x => x.TodoId,
                new Todo()
                {
                    Name = "clean the house",
                    Priority = "cLow"
                },
                new Todo()
                {
                    Name = "water the dog",
                    Priority = "bMedium"
                },
                new Todo()
                {
                    Name = "feed the lawn",
                    Priority = "bMedium"
                }, 
                new Todo()
                {
                    Name = "pay dem bills",
                    Priority = "aHigh"
                },
                new Todo()
                {
                    Name = "run",
                    Priority = "aHigh"
                },
                new Todo()
                {
                    Name = "swim",
                    Priority = "cLow"
                }
            );
        }
    }
}
