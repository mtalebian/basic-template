export const tableMessages = {
    Search: "Search...",
    New: "New",
    Edit: "Edit",
    Cancel: "Cancel",
    Delete: "Delete",
    Refresh: "Refresh",
    Save: "Save Changes",
    YouAreGoingToDeleteRows: "You are going to delete {count} row(s)!",
    ChangesAreSaved: "{plural}: Changes are saved.",
    RowsDeleted: "{plural}: {count} row(s) deleted.`",
    RowsSelected: "{count} row(s) selected",

    format: (message, args) => {
        if (!message || !args) return message;
        for (var propName in args) {
            message = message.replace("{" + propName + "}", args[propName]);
        }
        return message;
    },
};
