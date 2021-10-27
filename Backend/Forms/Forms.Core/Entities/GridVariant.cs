﻿using System;

namespace Forms.Core
{
    public class GridVariant
    {
        public int Serial { get; set; }

        public int GridId { get; set; }
        public string TableName { get; set; }

        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}