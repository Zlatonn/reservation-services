import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const main = async () => {
	const offices = [
		{ name: "สำนักงานขนส่งกรุงเทพมหานครพื้นที่ 1 (บางขุนเทียน)", address: "เขตบางขุนเทียน กรุงเทพฯ" },
		{ name: "สำนักงานขนส่งกรุงเทพมหานครพื้นที่ 2 (ตลิ่งชัน)", address: "เขตตลิ่งชัน กรุงเทพฯ" },
		{ name: "สำนักงานขนส่งกรุงเทพมหานครพื้นที่ 3 (พระโขนง)", address: "เขตพระโขนง กรุงเทพฯ" },
		{ name: "สำนักงานขนส่งกรุงเทพมหานครพื้นที่ 4 (มีนบุรี)", address: "เขตมีนบุรี กรุงเทพฯ" },
		{ name: "สำนักงานขนส่งกรุงเทพมหานครพื้นที่ 5 (จตุจักร)", address: "เขตจตุจักร กรุงเทพฯ" },
		{ name: "สำนักงานขนส่งจังหวัดนนทบุรี", address: "อำเภอเมือง นนทบุรี" },
		{ name: "สำนักงานขนส่งจังหวัดนนทบุรี สาขาบางบัวทอง", address: "บางบัวทอง นนทบุรี" },
		{ name: "สำนักงานขนส่งจังหวัดปทุมธานี", address: "อำเภอเมือง ปทุมธานี" },
		{ name: "สำนักงานขนส่งจังหวัดปทุมธานี สาขาธัญบุรี", address: "ธัญบุรี ปทุมธานี" },
		{ name: "สำนักงานขนส่งจังหวัดสมุทรปราการ", address: "อำเภอเมือง สมุทรปราการ" },
	]

	for (const office of offices) {
		await prisma.office.upsert({
			where: { name: office.name },
			update: {},
			create: office,
		})
	}

	const serviceCategories = [
		{
			name: "งานทะเบียน",
			serviceNames: [
				"จดทะเบียนรถใหม่",
				"ต่ออายุทะเบียน",
				"แจ้งเปลี่ยนสีรถ",
				"ยกเลิกทะเบียนรถ",
				"เปลี่ยนแปลงข้อมูลทะเบียน",
			],
		},
		{
			name: "งานใบอนุญาต",
			serviceNames: [
				"ต่ออายุใบอนุญาตขับขี่",
				"ขอใบอนุญาตใหม่ (กรณีหาย)",
				"เปลี่ยนข้อมูลใบอนุญาต",
				"อบรมขอใบอนุญาตครั้งแรก",
				"ขอใบขับขี่สากล",
			],
		},
		{
			name: "ใบอนุญาตขับขี่ชาวต่างชาติ",
			serviceNames: [
				"ออกใบขับขี่ชาวต่างชาติใหม่",
				"ต่ออายุใบขับขี่ชาวต่างชาติ",
				"แปลใบขับขี่ต่างประเทศ",
				"ตรวจสอบใบขับขี่ต่างชาติ",
				"ปรับข้อมูลใบขับขี่ต่างชาติ",
			],
		},
		{
			name: "ใบอนุญาตส่วนบุคคล",
			serviceNames: [
				"ขอใบอนุญาตส่วนบุคคลใหม่",
				"ต่ออายุใบขับขี่ส่วนบุคคล",
				"ทดสอบใบขับขี่ส่วนบุคคล",
				"อบรมก่อนสอบใบขับขี่ส่วนบุคคล",
				"เปลี่ยนรูปถ่ายใบขับขี่ส่วนบุคคล",
			],
		},
		{
			name: "ใบอนุญาตขับรถสาธารณะ",
			serviceNames: [
				"ขอใบอนุญาตขับรถสาธารณะ",
				"ต่ออายุใบอนุญาตขับรถสาธารณะ",
				"อบรมผู้ขับรถแท็กซี่",
				"ตรวจประวัติผู้ขับขี่สาธารณะ",
				"เพิกถอนใบอนุญาตขับรถสาธารณะ",
			],
		},
		{
			name: "สอบกฎหมายขนส่ง",
			serviceNames: [
				"สอบความรู้กฎหมายขนส่ง",
				"อบรมทบทวนกฎหมายขนส่ง",
				"ออกใบรับรองการอบรมกฎหมาย",
				"จองสอบกฎหมายขนส่ง",
				"สอบกฎหมายขนส่งซ้ำ",
			],
		},
		{
			name: "อบรมตัดแต้ม",
			serviceNames: [
				"อบรมกรณีตัดแต้ม",
				"อบรมฝ่าฝืนกฎจราจร",
				"อบรมตัดแต้มออนไลน์",
				"นัดอบรมตัดแต้ม",
				"ออกใบรับรองการอบรมตัดแต้ม",
			],
		},
		{
			name: "บริการอื่น ๆ",
			serviceNames: ["แจ้งของหายในรถโดยสาร", "สอบถามข้อมูลทั่วไป", "รับรองเอกสาร"],
		},
	]

	for (const category of serviceCategories) {
		const createdCategory = await prisma.serviceCategory.upsert({
			where: { name: category.name },
			update: {},
			create: { name: category.name },
		})

		for (const serviceName of category.serviceNames) {
			await prisma.serviceName.upsert({
				where: { name: serviceName },
				update: {},
				create: {
					name: serviceName,
					serviceCategoryId: createdCategory.id,
				},
			})
		}
	}
}

main()
	.then(() => {
		console.log("Seeding completed.")
		return prisma.$disconnect()
	})
	.catch((e) => {
		console.error("Seeding failed:", e)
		return prisma.$disconnect().finally(() => process.exit(1))
	})
