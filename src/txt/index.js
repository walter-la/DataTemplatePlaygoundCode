const columnNamesExample
    = `Order	IsPrimaryKey	ColumnName	DataType	Length	IsNullable	Comment`

const textExample = `1		DisplayName	nvarchar	20	YES	中文姓名
2		LastLogon	datetime2		YES	最後一次登入日期
3		IsDeleted	bit		NO	是否虛擬刪除該資料
4	Y	Id	int		NO	
5		UserName	nvarchar	64	YES	
6		NormalizedUserName	nvarchar	64	YES	
7		Email	nvarchar	256	YES	
8		NormalizedEmail	nvarchar	256	YES	
9		EmailConfirmed	bit		NO	
10		PasswordHash	nvarchar	256	YES	
11		SecurityStamp	nvarchar	256	YES	
12		ConcurrencyStamp	nvarchar	256	YES	
13		PhoneNumber	nvarchar	20	YES	
14		PhoneNumberConfirmed	bit		NO	
15		TwoFactorEnabled	bit		NO	
16		LockoutEnd	datetimeoffset		YES	
17		LockoutEnabled	bit		NO	
18		AccessFailedCount	int		NO	
19		CreatedBy	int		YES	
20		Created	datetime2		NO	
21		LastModifiedBy	int		YES	
22		LastModified	datetime2		YES	`


function createExampleByColumns(columnNames) {
    return `<div>
    <pre v-for="(item, index) in items" :key="index">
                new YourClassName
                {
${ columnNames.map(name => `                    ${name} = "{{ item.${name} }}"`)
            .join(',\r\n')}
                },
    </pre>
    </div>`
}

export { columnNamesExample, textExample, createExampleByColumns }