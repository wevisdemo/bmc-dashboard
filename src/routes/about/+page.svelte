<script lang="ts">
	import WvButtonGroup from '@wevisdemo/ui/svelte/button-group.svelte';
	import WvButtonLink from '@wevisdemo/ui/svelte/button-link.svelte';
	import WvContainer from '@wevisdemo/ui/svelte/container.svelte';
	import WvParagraphGroup from '@wevisdemo/ui/svelte/paragraph-group.svelte';
	import SeoHead from '$lib/seo-head.svelte';
</script>

<SeoHead title="เกี่ยวกับโครงการ" />

{#snippet TextLink(text: string, href: string, external = false)}
	<a
		{href}
		class="text-blue-600 underline hover:text-blue-800"
		target={external ? '_blank' : undefined}
		rel={external ? 'nofollow noopener noreferrer' : undefined}
	>
		{text}
	</a>
{/snippet}

<WvContainer heading="เกี่ยวกับโครงการ">
	<WvParagraphGroup heading="เป้าหมาย">
		<p>
			<strong>สมาชิกสภากรุงเทพมหานคร หรือ ส.ก.</strong> — 'ผู้แทนประจำเขต' ที่มาจากการเลือกตั้งโดยตรงของประชาชน
			คือตัวละครที่เราต้องไม่ลืมเมื่อ 'การเลือกตั้งกรุงเทพมหานคร' เวียนมาถึง เพราะ #เลือกตั้งกทมไม่ได้มีแค่ผู้ว่า
		</p>
		<p>
			สำหรับการเลือกตั้ง กทม. ปี 2569 นี้ WeVis จึงพัฒนาเครื่องมือเพื่อสำรวจ 'งานในสภา'
			ของบรรดาผู้แทนเขตตลอดวาระ 4 ปีที่ผ่านมา (2565-2569) ว่า "ส.ก. พูดคุย เสนอ และศึกษาอะไรบ้าง"
			ผ่าน <strong
				>การตั้งกระทู้ถาม การเสนอญัตติ การศีกษาในคณะกรรมการสามัญและวิสามัญ การพิจารณางบประมาณ
				และการเสนอร่างข้อบัญญัติ</strong
			>
		</p>
		<p>
			ซึ่งเป็นกลไกที่สะท้อนหน้าที่ของ ส.ก. ตาม พ.ร.บ. บริหารราชการกรุงเทพมหานคร พ.ศ. 2528
			นั่นคือการติดตาม-ตรวจสอบ-ให้ข้อเสนอแนะแก่ฝ่ายบริหาร การเสนอกฎหมาย
			และการพิจารณางบประมาณรายจ่ายของกรุงเทพมหาคร
		</p>
		<p>
			<strong>ส.ก. ทำอะไรในสภา ให้ข้อมูลช่วยเล่า</strong> ช่วยให้คุณทำความเข้าใจงานของพวกเขา และช่วยเป็นข้อมูลตั้งต้นสำหรับพิจารณาต่อว่า
			สิ่งที่ ส.ก. ได้ขับเคลื่อนไปก่อนหน้า เป็นสิ่งที่ตอบโจทย์ของคุณ หรือสิ่งที่คุณเห็นว่าเป็นปัญหาของเขตหรือไม่
			?
		</p>
		<p>
			แล้วอะไรที่ยังขาดไป หรือยังต้องขับเคลื่อนกันต่อ ที่คุณอยากเห็นในนโยบายของ ส.ก.
			ในการเลือกตั้งครั้งนี้ ? เพื่อตัดสินใจในการเลือกผู้แทนเขตที่จะมาเป็นตัวแทนเพื่อตรวจสอบ ติดตาม
			การแก้ปัญหาในพื้นที่ของคุณในอีก 4 ปีหลังจากนี้
		</p>
	</WvParagraphGroup>

	<div id="data-methodology" class="h-0 -translate-y-6"></div>

	<WvParagraphGroup heading="ที่มาและข้อจำกัดของข้อมูล">
		<h3 class="wv-h7 wv-kondolar">1. ข้อมูลเรื่องที่ ส.ก. เสนอในสภากรุงเทพมหานคร ปี 2565-2569*</h3>
		<p>
			ทีมงานรวบรวมจาก {@render TextLink('เว็บไซต์สภากรุงเทพมหานคร', 'https://bmc.go.th/', true)} (ส่วน
			'ภารกิจหลัก') และส่วนหนึ่งอาศัยการขอข้อมูลโดยตรงจากสำนักงานเลขานุการสภากรุงเทพมหานคร โดยพิจารณาเฉพาะรายการที่ถูกเสนอหลังจากวันที่สภากรุงเทพมหานครชุดที่
			13 เริ่มปฏิหน้าที่ (6 มิถุนายน 2565)
		</p>
		<p>ข้อมูลแต่ละส่วนถูกสืบค้น และ/หรือ ได้รับมา และ/หรือ อัปเดต ในวันที่ดังต่อไปนี้</p>
		<ul>
			<li>
				<strong>กระทู้ถาม</strong>
				<ul>
					<li>เก็บข้อมูลจากเว็บไซต์สภาฯ วันที่ 29 เมษายน 2569</li>
					<li>อัปเดตข้อมูล วันที่ 22 พฤษภาคม 2569</li>
				</ul>
			</li>
			<li>
				<strong>ญัตติ</strong>
				<ul>
					<li>เก็บข้อมูลจากเว็บไซต์สภาฯ วันที่ 29 เมษายน 2569</li>
					<li>อัปเดตข้อมูล วันที่ 22 พฤษภาคม 2569</li>
				</ul>
			</li>
			<li>
				<strong>เรื่องที่ศึกษาในคณะกรรมการวิสามัญทั่วไปและวิสามัญข้อบัญญัติ</strong>
				<ul>
					<li>เก็บข้อมูลจากเว็บไซต์สภาฯ วันที่ 7 และ 17 เมษายน 2569</li>
					<li>อัปเดตข้อมูล วันที่ 22 พฤษภาคม 2569</li>
				</ul>
			</li>
			<li>
				<strong>เรื่องที่ศึกษาในคณะกรรมการสามัญ**</strong>
				<ul>
					<li>(ข้อมูลปี 2565, 2569) เก็บข้อมูลจากเว็บไซต์สภาฯ วันที่ 29 เมษายน 2569</li>
					<li>(ข้อมูลปี 2566, 2567) ได้รับข้อมูลจากสำนักงานเลขาฯ วันที่ 4 พฤษภาคม 2569</li>
				</ul>
			</li>
			<li>
				<strong>การเสนอร่างข้อบัญญัติ</strong>
				<ul>
					<li>ได้รับข้อมูลจากสำนักงานเลขาฯ วันที่ 7 เมษายน 2569</li>
					<li>อัปเดตข้อมูล วันที่ 20 พฤษภาคม 2569</li>
				</ul>
			</li>
			<li>
				<strong>การพิจารณางบประมาณ</strong>
				<ul>
					<li>ขอข้อมูลจากสำนักงานเลขาฯ วันที่ 11 พฤษภาคม 2569</li>
				</ul>
			</li>
		</ul>
		<p><strong>หมายเหตุ</strong></p>
		<p>
			* เว็บไซต์นี้เก็บข้อมูลเฉพาะ 'งานของ ส.ก. ในสภา' ที่ถูกบันทึกเป็นลายลักษณ์อักษรเท่านั้น
			ดังนั้น 'งานนอกสภา' ต่าง ๆ เช่น การลงพื้นที่ การประสานกับหน่วยงานต่าง ๆ เพื่อแก้ไขปัญหา
			ซึ่งบ้างถูกเผยแพร่ทางโซเชียลมีเดียของ สก แต่ละคน บ้างไม่มีการบันทึกไว้
			จะไม่ถูกแสดงผลในเว็บไซต์นี้
		</p>
		<p>
			** เว็บไซต์นี้ไม่แสดงข้อมูลของคณะกรรมการตรวจรายงานสภา
			เนื่องจากผลงานของคณะกรรมนี้คือการตรวจรายงานของคณะกรรมการอื่น ๆ ไม่ได้มีโครงการเป็นของตนเอง
		</p>

		<h3 class="wv-h7 wv-kondolar">2. ข้อมูลบุคคล</h3>
		<ul>
			<li>
				รายชื่อสมาชิกสภากรุงเทพมหานครชุดที่ 13 รวบรวมจาก {@render TextLink(
					'เว็บไซต์สภากรุงเทพมหานคร',
					'https://bmc.go.th/former-members-13/',
					true
				)}
			</li>
			<li>
				พรรคที่ ส.ก. สังกัดที่แสดงผลในเว็บไซต์นี้ <strong
					>อ้างอิงจากพรรค ณ วันที่เริ่มดำรงตำแหน่ง ส.ก. ชุดที่ 13</strong
				>
			</li>
			<li>
				<strong>ตำแหน่ง</strong>ของสมาชิกในคณะกรรมการ
				<strong>จะแสดงผลเฉพาะตำแหน่งล่าสุด ก่อนสมาชิกผู้นั้นพ้นจากตำแหน่ง</strong> ไม่ว่าจะด้วยการลาออก
				พ้นสภาพ เสียชีวิต หรือคณะกรรมการทั้งชุดหมดวาระ
			</li>
		</ul>

		<h3 class="wv-h7 wv-kondolar">3. การระบุประเด็นและเขตพื้นที่ของแต่ละรายการข้อมูล</h3>
		<ul>
			<li>
				<strong>ประเด็น (Topics)</strong> ของแต่ละรายการ ถูกกำหนดโดยทีมงาน WeVis โดยพิจารณาจากชื่อรายการ
				โดยในบางรายการร่วมกับรายละเอียดเนื้อหาด้วยหากชื่อรายการเป็นชื่อกว้าง ๆ ไม่ระบุประเด็นอย่างชัดเจน
			</li>
			<li>
				<strong>เขต (Districts)</strong> ที่เกี่ยวข้องกับแต่ละรายการ ระบุจากชื่อเขต และ/หรือ ชื่อสถานที่ที่ปรากฏในชื่อรายการข้อมูล
				หากรายการใดไม่สามารถระบุเขตได้ จะระบุว่า "ไม่ระบุเขต" นั่นคือ เป็นรายการที่กล่าวถึงภาพรวมของกรุงเทพมหานคร
			</li>
			<li><strong>1 รายการข้อมูล สามารถเกี่ยวข้องได้มากกว่า 1 ประเด็น และมากกว่า 1 เขต</strong></li>
		</ul>

		<h3 class="wv-h7 wv-kondolar">4. การจัดกลุ่มรายการข้อมูล</h3>
		<p>
			รายการข้อมูลที่มีส่วนของชื่อที่ตรงกัน และ/หรือ ในเอกสารต้นฉบับมีการอ้างอิงถึงกัน
			จะถูกจัดกลุ่มเพื่อแสดงผลในหน้าเดียวกัน เช่น
			<a href="/outputs/1iih2p7drl56s"
				>ญัตติขอให้สภากรุงเทพมหานครตั้งคณะกรรมการวิสามัญศึกษาแนวทางแก้ไขปัญหาสัตว์จรจัดในกรุงเทพมหานคร-คณะกรรมการวิสามัญศึกษาแนวทางแก้ไขปัญหาสัตว์จรจัดในกรุงเทพมหานคร</a
			>
		</p>
	</WvParagraphGroup>

	<WvParagraphGroup heading="นโยบายการนำข้อมูลไปใช้ต่อ">
		<p>
			ทางทีมมีความตั้งใจที่พัฒนาทุกโปรเจกต์ให้เป็น Open Source และเปิดข้อมูลเป็น Open Data
			ภายใต้ข้อตกลงในการใช้งาน {@render TextLink(
				'Term of Use',
				'https://wevis.info/terms-of-use/',
				true
			)}
		</p>
	</WvParagraphGroup>

	<WvParagraphGroup heading="ทีมงานร่วมพัฒนา">
		<WvParagraphGroup small heading="พัฒนาเว็บไซต์">
			<p>{@render TextLink('วิถี ภูษิตาศัย', 'https://github.com/Th1nkK1D', true)}</p>
		</WvParagraphGroup>
		<WvParagraphGroup small heading="ออกแบบเว็บไซต์">
			<p>ชินธิป เอกก้านตรง</p>
		</WvParagraphGroup>
		<WvParagraphGroup small heading="สืบค้นและเรียบเรียงข้อมูล">
			<p>ณภัทร แต้เถา</p>
			<p>{@render TextLink('น้ำใส ศุภวงศ์', 'https://www.instagram.com/namsaisupavong/', true)}</p>
		</WvParagraphGroup>
		<WvParagraphGroup small heading="บรรณาธิการ">
			<p>{@render TextLink('ธนิสรา เรืองเดช', 'https://www.linkedin.com/in/thanisara-r/', true)}</p>
			<p>{@render TextLink('น้ำใส ศุภวงศ์', 'https://www.instagram.com/namsaisupavong/', true)}</p>
		</WvParagraphGroup>
	</WvParagraphGroup>
	<WvParagraphGroup heading="หมายเหตุ">
		<p>
			{@render TextLink('WeVis', 'https://wevis.info/', true)}
			ได้รับการสนับสนุนทุนในการดำเนินงานจาก
			{@render TextLink('National Endowment for Democracy (NED)', 'https://www.ned.org/', true)}
			และ
			{@render TextLink('International Republican Institute', 'https://www.iri.org/', true)} ซึ่งนำมาใช้เป็นต้นทุนในการรวมรวมข้อมูล
			ออกแบบ พัฒนาเว็บไซต์ ประสานงาน บริหารจัดการ ตลอดจนการจัดประชุมเพื่อดำเนินโครงการ
		</p>
		<p>
			หากมีข้อสงสัยต้องการสอบถามเพิ่มเติม ประสงค์แจ้งเปลี่ยนแปลงหรือเพิ่มเติมข้อมูลเพื่อความถูกต้อง
			หรือมีข้อเสนอแนะใดๆ สามารถติดต่อได้ที่ <strong>team@wevis.info</strong>
		</p>
	</WvParagraphGroup>
	<WvButtonGroup center>
		<WvButtonLink href="http://link.wevis.info/bmcdata" target="_blank">
			<svg width="21" height="21" viewBox="0 0 21 21" fill="none">
				<g clip-path="url(#clip0_314_173)">
					<path
						d="M7.03582 2.86356H1.17529V19.4081H19.8247V2.86356C19.8247 2.86356 15.306 2.86356 13.9642 2.86356"
						stroke="currentColor"
						stroke-width="2"
						stroke-miterlimit="10"
					/>
					<path
						d="M16.0317 8.65536L10.7284 13.9587L5.42513 8.65536"
						stroke="currentColor"
						stroke-width="2"
						stroke-miterlimit="10"
					/>
					<line x1="10.667" y1="0.5" x2="10.667" y2="13" stroke="currentColor" stroke-width="2" />
				</g>
				<defs>
					<clipPath id="clip0_314_173">
						<rect width="20.8333" height="20" fill="white" transform="translate(0.0834961 0.5)" />
					</clipPath>
				</defs>
			</svg>
			<span>ดาวน์โหลดข้อมูล</span>
		</WvButtonLink>
		<WvButtonLink href="https://airtable.com/appsowPzCsRLmUvNx/shryu4errnlj1LWsM" target="_blank">
			<img
				width="30"
				src="data:image/png;base64,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"
				alt=""
			/>
			<span>Feedback</span>
		</WvButtonLink>
	</WvButtonGroup>
</WvContainer>

<style>
	@reference '../layout.css';

	ul {
		@apply ml-5 list-disc space-y-1;
	}

	h3 {
		@apply font-bold text-pretty;
	}
</style>
