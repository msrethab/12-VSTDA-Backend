namespace TodoList.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Todos",
                c => new
                    {
                        TodoId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Priority = c.String(),
                    })
                .PrimaryKey(t => t.TodoId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Todos");
        }
    }
}
