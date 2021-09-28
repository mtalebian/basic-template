import { Column, Table } from "./table";

export const menus = new Table({
    name: 'Menus',
    title: 'منو ها',
    singularTitle: 'منو',
    columns: [
        new Column({
            isPK: true,
            name: 'id',
            title: 'شناسه',
            dir:"ltr",
        }),

        new Column({
            name: 'title',
            title: 'عنوان',
            editor: 'check',
        }),

        new Column({
            name: 'sortOrder',
            title: 'ترتیب',
            editor: 'number',
            dir:"ltr",
        }),

        new Column({
            name: 'url',
            title: 'آدرس صفحه',
            dir:"ltr",
        }),

        new Column({
            name: 'openInNewTab',
            title: 'در صفحه جدید باز شود؟',
            editor: 'checkbox',
        }),
    ],
});

/*
{ id: 'm01', menuFolderId: null, title: 'راهنمای سیستم' },
{ id: 'm02', menuFolderId: null, title: 'قوانیم و مقررات' },
{ id: 'm03', menuFolderId: 'f0', title: 'لیست مستر دیتا ها' },
{ id: 'm04', menuFolderId: 'f01', title: 'تعریف قطعه' },
{ id: 'm05', menuFolderId: 'f011', title: 'تعریف ویوی خرید قطعه' },
{ id: 'm06', menuFolderId: 'f02', title: 'سازمان خرید' },
{ id: 'm07', menuFolderId: 'f02', title: 'انواع اسناد خرید' },
{ id: 'm08', menuFolderId: 'f11', title: 'ایجاد کسب و کار' },
{ id: 'm09', menuFolderId: 'f11', title: 'احراز هویت کسب و کار' },
*/