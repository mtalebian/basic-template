USE [Backend]
GO

/****** Object:  Table [pur].[DemamdItems]    Script Date: 12/4/2021 12:09:02 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [pur].[DemamdItems](
	[Serial] [int] IDENTITY(1,1) NOT NULL,
	[DemandSerial] [int] NOT NULL,
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
	[CreatedAt] [datetime] NOT NULL
) ON [PRIMARY]
GO

ALTER TABLE [pur].[DemamdItems] ADD  CONSTRAINT [DF_DemamdItems_IsReleased]  DEFAULT ((0)) FOR [IsReleased]
GO

ALTER TABLE [pur].[DemamdItems] ADD  CONSTRAINT [DF_DemamdItems_DeletionFlag]  DEFAULT ((0)) FOR [DeletionFlag]
GO


