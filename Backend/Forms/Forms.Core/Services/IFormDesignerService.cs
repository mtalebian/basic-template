using System.Collections.Generic;

namespace Forms.Core
{
    public interface IFormDesignerService
    {
        IList<Group> GetAllGroups(string projectId);
        Group GetGroup(string projectId, int id);
        void Insert(Group group);
        void Update(ref Group group);
        void DeleteGroup(string projectId, int groupId);

        IList<Table> GetTables(string projectId, int groupId);
        Table GetTable(string projectId, string tableName);
        void Insert(Table Table, IList<Column> columns);
        void Update(ref Table item, IList<Column> columns);
        void DeleteTable(string projectId, string tableName);

        IList<Column> GetColumns(string projectId, string tableName);
        void Insert(Column column);
        void Update(ref Column column);
        void DeleteColumn(int id);
    }
}