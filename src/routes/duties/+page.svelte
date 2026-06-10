<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { Information } from 'carbon-icons-svelte';
	import { EventGroup } from '$lib/constants';
	import DutyCard from '$lib/duties/duty-card.svelte';
	import TabView from '$lib/inputs/tab-view.svelte';
	import RemarkMessage from '$lib/remark-message.svelte';
	import Hero from '$lib/sections/hero.svelte';
	import PageFooter from '$lib/sections/page-footer.svelte';
	import SeoHead from '$lib/seo-head.svelte';

	const tabs = ['หน้าที่ตาม พ.ร.บ.', 'งานนอกเหนือจากหน้าที่ตาม พ.ร.บ.'];

	const tabContentClass = 'wv-b6 flex flex-col gap-3 p-5 pt-0! md:gap-6 md:p-6';
</script>

<SeoHead
	title="ส.ก. ทำอะไรได้บ้าง"
	description="รู้จัก ส.ก. และสำรวจเรื่องที่พวกเขาพูดคุย ศึกษา และเสนอในสภา กทม."
/>

<Hero>
	<h1 class="wv-h4 wv-kondolar text-center font-bold">ส.ก. ทำอะไรได้บ้าง</h1>
	<p class="wv-b5 text-center">
		<strong>สมาชิกสภากรุงเทพมหานคร (ส.ก.)</strong> คือ 'ผู้แทนเขต'
		ที่เข้าไปทำหน้าที่ในสภากรุงเทพมหานคร ส.ก. มาจากการเลือกตั้งโดยตรงของประชาชน ปกติจะมีเขตละ 1 คน
		(ขึ้นอยู่กับจำนวนประชากร) รวมเป็น 50 คน
		<br /><br />
		<strong>ส.ก. ต่างจาก ส.ส. เขต ยังไง ?</strong> ส.ส. เขตขับเคลื่อนประเด็นในเขตไปสู่ รัฐสภา ส่วน
		ส.ก. จะขับเคลื่อนไปสู่ <strong>สภากรุงเทพมหานคร</strong> เช่น ตั้งกระทู้ถามผู้ว่าฯ เสนอร่างข้อบัญญัติ
		ที่ใช้เฉพาะในกทม.
	</p>
	<RemarkMessage class="text-neutral-500">
		{#snippet icon(props)}
			<Information {...props} />
		{/snippet}

		<p>
			ที่มา: มาตรา 29, 38, 104 <a
				href="https://bmc.go.th/wp-content/uploads/2020/05/02-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%9A%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B1%E0%B8%95%E0%B8%B4.pdf"
				target="_blank"
				class="underline hover:text-neutral-400"
				>พ.ร.บ. ระเบียบบริหารราชการ กทม. พ.ศ. 2528 แก้ไขเพิ่มเติมถึงฉบับที่ 6 พ.ศ. 2562</a
			>
		</p>
		<p class="mt-2">
			ในเว็บไซต์นี้ เราจะแสดงข้อมูลเฉพาะที่เป็น หน้าที่อย่างเป็นทางการของ ส.ก. ตาม พ.ร.บ.
			ซึ่งเผยแพร่บันทึกอย่างเป็นลายลักษณ์อักษรเท่านั้น หากสนใจการทำงานของ ส.ก. เพิ่มเติม
			สามารถสืบค้นต่อได้ทางโซเชียลมีเดียของ ส.ก. แต่ละคน หรือเทปบันทึกการประชุมสภา กทม.
		</p>
	</RemarkMessage>
</Hero>

<div class="mx-auto max-w-4xl p-5 md:pt-12">
	<TabView {tabs} value={tabs[0]} triggerClass="w-1/2">
		{#snippet trigger(value)}
			<h4 class="wv-h9 font-bold">{value}</h4>
		{/snippet}

		<Tabs.Content value={tabs[0]}>
			<div class={tabContentClass}>
				<DutyCard
					title="ตรวจสอบและติดตามฝ่ายบริหาร"
					imageUrl="/images/duties/duty-1.webp"
					links={[
						{
							label: 'ดูกระทู้ทั้งหมดของ ส.ก. ชุดที่ 13',
							path: `/?tab=${EventGroup.Subject}#list`
						},
						{ label: 'ดูญัตติทั้งหมดของ ส.ก. ชุดที่ 13', path: `/?tab=${EventGroup.Motion}#list` }
					]}
				>
					สามารถทำได้ผ่านการ <strong>ตั้งกระทู้ถาม เสนอญัตติ เปิดอภิปรายทั่วไป</strong> ในการประชุมสภา
				</DutyCard>
				<DutyCard
					title="ตราข้อบังคับการประชุมและการปฏิบัติหน้าที่"
					imageUrl="/images/duties/duty-2.webp"
				>
					ได้แก่ ข้อบังคับเกี่ยวกับจรรยาบรรณของ ส.ก. ข้อบังคับการประชุมเกี่ยวกับการเลือกประธาน
					รองประธานสภา คณะกรรมการสามัญและวิสามัญ และวิธีการประชุม
				</DutyCard>
				<DutyCard
					title="เสนอและพิจารณาร่างกฎหมาย"
					imageUrl="/images/duties/duty-3.webp"
					links={[
						{
							label: 'ดูข้อบัญญัติทั้งหมดของ ส.ก. ชุดที่ 13',
							path: `/?tab=${EventGroup.Bill}#list`
						}
					]}
				>
					นอกจากหน้าที่ <strong>พิจารณาและลงมติ</strong> ในร่างข้อบัญญัติที่ ฝ่ายบริหารเสนอแล้ว
					<strong>ส.ก. ก็สามารถเสนอร่างข้อบัญญัติเองได้ด้วย</strong>
					หากต้องการผลักดันประเด็นหนึ่ง ๆ ให้เป็นบรรทัดฐาน

					<p class="mt-2 text-neutral-500">*สภา กทม. ไม่เปิดเผยข้อมูลการลงมติ</p>
				</DutyCard>
				<DutyCard
					title="ศึกษาและให้ข้อเสนอแนะกับฝ่ายบริหาร"
					imageUrl="/images/duties/duty-4.webp"
					links={[
						{
							label: 'ดูเรื่องที่ศึกษาทั้งหมดของ ส.ก. ชุดที่ 13',
							path: `/?tab=${EventGroup.CommitteeStudy}#list`
						}
					]}
				>
					ผ่านการนั่งใน <strong>คณะกรรมการสามัญประจำ กทม.</strong> หรือ
					<strong>คณะกรรมการวิสามัญ</strong>
					ซึ่งตั้งขึ้นตามกรณี
				</DutyCard>
				<DutyCard
					title="พิจารณางบประมาณ"
					imageUrl="/images/duties/duty-5.webp"
					links={[
						{
							label: 'ดูการพิจารณางบประมาณทั้งหมดของ ส.ก. ชุดที่ 13',
							path: `/?tab=${EventGroup.Budget}#list`
						}
					]}
				>
					ผ่านการนั่งใน <strong>คณะกรรมการวิสามัญพิจารณาร่างข้อบัญญัติงบประมาณ</strong> ที่เสนอโดยฝ่ายบริหาร
				</DutyCard>
			</div>
		</Tabs.Content>

		<Tabs.Content value={tabs[1]}>
			<div class={tabContentClass}>
				<DutyCard title="ลงพื้นที่เขตของตน" imageUrl="/images/duties/duty-6.webp">
					ส.ก. มักลงพื้นที่พบปะประชาชน เพื่อรับทราบปัญหาในพื้นที่
					และดำเนินการแก้ไขต่อไปผ่านวิธีการต่าง ๆ
				</DutyCard>
				<DutyCard title="ประสานงานกับส่วนราชการ" imageUrl="/images/duties/duty-7.webp">
					เป็นวิธีการหนึ่งที่ ส.ก. ใช้เพื่อแก้ไขปัญหาในเขตพื้นที่ เนื่องจากไม่ใช่ทุกครั้งที่ ส.ก.
					จะขับเคลื่อนประเด็นปัญหาผ่านกลไกสภา (เช่น การตั้งกระทู้ถาม เสนอญัตติ)
					แต่อาจใช้การประสานกับหน่วยงานโดยตรงเพื่อการแก้ปัญหาอย่างรวดเร็ว
				</DutyCard>
			</div>
		</Tabs.Content>
	</TabView>
</div>

<PageFooter
	pages={[
		{
			href: '/#explore',
			text: 'ภายใต้หน้าที่เหล่านี้ ส.ก. พูดคุย เสนอ ศึกษาอะไรบ้างในสภา ตลอด 4 ปีที่ผ่านมา',
			buttonLabel: 'เลือกสำรวจรายการต่าง ๆ'
		},
		{
			href: '/articles',
			text: 'อ่านบทความเกี่ยวกับ ส.ก. และเนื้อหาอื่น ๆ ที่เกี่ยวข้อง',
			buttonLabel: 'อ่านบทความ'
		}
	]}
/>
