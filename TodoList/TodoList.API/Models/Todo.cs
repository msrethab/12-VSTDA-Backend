using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoList.API.Models
{
    public class Todo
    {
        // Primary key
        public int TodoId { get; set; }

        // Additional columns
        public string Name { get; set; }
        public string Priority { get; set; }

    }
}