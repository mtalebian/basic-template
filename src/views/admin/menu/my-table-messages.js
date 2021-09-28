
export const myTableMessages = {
    Search: 'جستجو ...',
    New: 'ایجاد',
    Edit: 'ویرایش',
    Cancel: 'انصراف',
    Delete: 'حذف',
    Refresh: 'بروزرسانی',
    Save: 'ثبت تغییرات',
    YouAreGoingToDeleteRows: 'شما در حال حذف {count} ردیف می باشید!',
    ChangesAreSaved: '{plural}: تغییرات با موفقیت ثبت شد',
    RowsDeleted: '{plural}: {count} ردیف حدف شد',
    RowsSelected: '{count} ردیف انتخاب شده است',

    format: (message, args) => {
        if (!message || !args) return message;
        for (var propName in args) {
            message = message.replace("{" + propName + "}", args[propName]);
        }
        return message;
    }
}
