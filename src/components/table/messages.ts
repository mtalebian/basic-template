export type TableMessages = {
    showing?: string;
    showingFiltered?: string;
    page?: string;
    gotoPage?: string;
    firstPage?: string;
    prevPage?: string;
    nextPage?: string;
    lastPage?: string;
};

export default {
    showing: "showing {from} to {to} of {total}",
    showingFiltered: "showing {from} to {to} of {total} (filtered from ${all} rows)",
    page: "Page {page} of {total}",
    gotoPage: "Go to page",
    firstPage: "First page",
    prevPage: "Previous page",
    nextPage: "Next page",
    lastPage: "Last page",
};
