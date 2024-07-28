USE [cms]
GO

/****** Object:  Table [dbo].[Categories]    Script Date: 28/07/2024 4:49:58 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Categories](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[CategoryID] [bigint] NULL,
	[CategoryName] [nvarchar](max) NULL,
	[CategoryDescription] [nvarchar](max) NULL,
	[IsDeleted] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Categories] ADD  CONSTRAINT [DF_Categories_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO


CREATE TABLE [dbo].[Companies](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[CompanyName] [nvarchar](max) NOT NULL,
	[CompanyDescription] [nvarchar](max) NULL,
	[CompanyABN] [nvarchar](max) NULL,
	[CompanyPhoneNumber] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


CREATE TABLE [dbo].[Employees](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeFirstName] [nvarchar](max) NULL,
	[EmployeeMidleName] [nvarchar](max) NULL,
	[EmployeeLastName] [nvarchar](max) NULL,
	[StreetAddress] [nvarchar](max) NULL,
	[Suburb] [nvarchar](max) NULL,
	[City] [nvarchar](max) NULL,
	[State] [nvarchar](max) NULL,
	[Country] [nvarchar](max) NULL,
	[Postcode] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[DOB] [date] NULL,
	[Gender] [nvarchar](max) NULL,
	[TFN] [nvarchar](max) NULL,
	[ABN] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[EmploymentClassifications](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[EmploymentClassificationType] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[Pages](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[PageName] [nvarchar](max) NULL,
	[PageTitle] [nvarchar](max) NULL,
	[CategoryID] [bigint] NULL,
	[ParentID] [bigint] NULL,
	[PageAreaID] [bigint] NULL,
	[PageContent] [nvarchar](max) NULL,
	[HeaderContent] [nvarchar](max) NULL,
	[FooterContent] [nvarchar](max) NULL,
	[SequenceOrderID] [bigint] NULL,
	[AuthorID] [bigint] NULL,
	[DateCreated] [datetime] NULL,
	[DateLastModified] [datetime] NULL,
	[IsDeleted] [bit] NULL,
	[ThemeID] [bigint] NULL,
	[SiteID] [bigint] NULL,
	[SiteLocalityName] [nvarchar](max) NULL,
	[PublishVersionID] [nvarchar](max) NULL,
	[IsPublished] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Pages] ADD  CONSTRAINT [DF_Pages_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Pages] ADD  CONSTRAINT [DF_Pages_IsPublished]  DEFAULT ((0)) FOR [IsPublished]
GO

CREATE TABLE [dbo].[PayrollEntries](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [bigint] NULL,
	[EmploymentStartDate] [date] NULL,
	[EmploymentClassification] [bigint] NULL,
	[UsualWorkingHoursPerDay] [money] NULL,
	[JobStatus] [bigint] NULL,
	[Reference] [nvarchar](max) NULL,
	[LeaveEntitlements] [bigint] NULL,
	[WageSupplements] [bigint] NULL,
	[BasicSalaryPerHour] [money] NULL,
	[OverTimePerHour] [money] NULL,
	[GrossPay] [money] NULL,
	[NetPay] [money] NULL,
	[Tax] [money] NULL,
	[PensionAndSuperannuation] [money] NULL,
	[StudentLoan] [money] NULL,
	[InsurancePay] [money] NULL,
	[Deductions] [money] NULL,
	[Grade] [bigint] NULL,
	[Department] [bigint] NULL,
	[PayDate] [date] NULL,
	[TaxPeroid] [nvarchar](max) NULL,
	[InsuranceNumber] [nvarchar](max) NULL,
	[SuperannuationRate] [money] NULL,
	[TaxiblePay] [money] NULL,
	[MedicareDeduction] [money] NULL,
	[OtherDeductions] [money] NULL,
	[PayGWithholdingNumber] [nvarchar](max) NULL,
	[EmployerCompany] [bigint] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[PayrollToTimesheetMap](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[PayrollEntryID] [bigint] NULL,
	[TimesheetID] [bigint] NULL,
	[IsApproved] [bit] NULL
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[PayrollToTimesheetMap] ADD  CONSTRAINT [DF_PayrollToTimesheetMap_IsApproved]  DEFAULT ((0)) FOR [IsApproved]
GO

CREATE TABLE [dbo].[TimesheetCategories](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](max) NOT NULL,
	[CategoryLongDescription] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[Timesheets](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[TimesheetCategory] [bigint] NULL,
	[TimesheetDescription] [nvarchar](max) NULL,
	[TimesheetTimeSpanBegin] [datetime] NULL,
	[TimesheetTimeSpanEnd] [datetime] NULL,
	[TimesheetCompanyID] [bigint] NULL,
	[IsDeleted] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Timesheets] ADD  CONSTRAINT [DF_Timesheets_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

CREATE TABLE [dbo].[UserRoles](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[UserID] [bigint] NOT NULL,
	[Role] [nvarchar](max) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[Users](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](max) NULL,
	[EmailAddress] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
	[Is2FAEnabled] [bit] NULL,
	[ProfileURL] [nvarchar](max) NULL,
	[Salt] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_Is2FAEnabled]  DEFAULT ((0)) FOR [Is2FAEnabled]
GO