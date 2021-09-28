import { Column, Table } from "./table";

export const menuFolders = new Table({
    name: 'MenuFolders',
    title: 'پوشه ها',
    singularTitle: 'پوشه',
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
        }),
        new Column({
            name: 'sortOrder',
            title: 'ترتیب',
            editor: 'number',
            dir:"ltr",
        }),
    ],
});/*
  { id: 'f0', title: 'مستر دیتا', parentId: null },
  { id: 'f01', title: 'قطعه', parentId: 'f0' },
  { id: 'f011', title: 'ویوها', parentId: 'f01' },
  { id: 'f02', title: 'خرید', parentId: 'f0' },
  { id: 'f1', title: 'شناسایی منابع', parentId: null },
  { id: 'f11', title: 'کسب و کار', parentId: 'f1' },
  { id: 'f12', title: 'خالی', parentId: 'f1' },
*/