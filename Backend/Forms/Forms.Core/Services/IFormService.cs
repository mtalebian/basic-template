using System.Collections.Generic;

namespace Forms.Core
{
    public interface IFormService
    {
        IList<Group> GetAllGroups(string projectId);
        Table GetTable(string projectId, string name);

        Dictionary<string, object> ExecuteSelect(string tableName, Dictionary<string, object> values);
        void ExecuteInsert(string tableName, Dictionary<string, object> values);
        void ExecuteDelte(string tableName, Dictionary<string, object> values);
        void ExecuteUpdate(string tableName, Dictionary<string, object> values); 
    }
}