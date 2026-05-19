import { BillStatus } from '$lib/sheets/bill';

export enum AdditionalDistrictOption {
	ALL = 'ทุกพื้นที่ (ทั้งที่ระบุและไม่ระบุเขต)',
	NotSpecified = 'ไม่ระบุเขต'
}

export enum EntityTabGroup {
	Subject = 'กระทู้ถาม',
	Motion = 'ญัตติ',
	CommitteeStudy = 'เรื่องที่ศึกษาโดยคณะกรรมการ',
	Bill = 'ข้อบัญญัติ'
}

export const billStatusConfig = {
	[BillStatus.ENACTED]: {
		classes: 'bg-[#92A843] text-white',
		dot: 'bg-[#5C623D]',
		label: 'ผ่านแล้ว'
	},
	[BillStatus.IN_PROGRESS]: {
		classes: 'bg-[#FAE160]',
		dot: 'bg-[#C9A903]',
		label: 'กำลังดำเนินงาน'
	},
	[BillStatus.REJECTED]: {
		classes: 'bg-[#FF4040] text-white',
		dot: 'bg-[#981313]',
		label: 'ถูกปัดตก'
	},
	[BillStatus.IN_QUEUE]: {
		classes: 'bg-[#CDC3CE]',
		dot: 'bg-[#CCA79C]',
		label: 'กำลังพิจารณา'
	}
};
