USE [Backend]
GO

/****** Object:  Table [pur].[PRItem]    Script Date: 12/4/2021 12:09:11 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [pur].[PRItem](
	[PRNo] [varchar](20) NOT NULL,
	[PRItem] [nchar](10) NOT NULL,
	[CompanyCode] [varchar](20) NOT NULL,
	[DocTypeId] [nchar](10) NOT NULL,
	[PGroup] [varchar](5) NOT NULL,
	[MaterialNo] [varbinary](20) NOT NULL,
	[MaterialTitle] [nvarchar](200) NOT NULL,
	[MaterialGroup] [varchar](10) NULL,
	[Qty] [float] NOT NULL,
	[Unit] [varchar](5) NULL,
	[NeedDate] [datetime] NOT NULL,
	[Requisitioner] [varchar](20) NULL,
	[Plant] [varchar](5) NULL,
	[SLoc] [varchar](5) NULL,
	[TrackingNo] [varchar](20) NULL,
	[ReleaseInd] [int] NOT NULL,
	[IsReleased] [bit] NOT NULL,
	[StatusId] [int] NOT NULL,
	[DeletionFlag] [bit] NOT NULL,
	[ModifiedBy] [varchar](20) NOT NULL,
	[ModifiedAt] [datetime] NOT NULL,
	[CreatedBy] [varchar](20) NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
 CONSTRAINT [PK_PRItem] PRIMARY KEY CLUSTERED 
(
	[PRNo] ASC,
	[PRItem] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [pur].[PRItem] ADD  CONSTRAINT [DF_PRItem_IsReleased]  DEFAULT ((0)) FOR [IsReleased]
GO

ALTER TABLE [pur].[PRItem] ADD  CONSTRAINT [DF_PRItem_DeletionFlag]  DEFAULT ((0)) FOR [DeletionFlag]
GO


