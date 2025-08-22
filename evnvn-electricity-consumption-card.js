function convertNumberToVietnameseWords(number) {
  const ChuSo = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  const Tien = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];

  if (isNaN(number) || number <= 0) return "Không đồng";
  if (number > 1e15) return "Số quá lớn";

  // Hàm tách chuỗi số thành các block 3 chữ số từ phải sang trái
  function splitIntoBlocks(numberStr) {
    const blocks = [];
    while (numberStr.length > 0) {
      let block = numberStr.slice(-3);
      numberStr = numberStr.slice(0, -3);
      blocks.unshift(block.padStart(3, '0'));
    }
    return blocks;
  }

  const blocks = splitIntoBlocks(number.toString());
  let chu = [];

  blocks.forEach((block, i) => {
    let str = "";
    let [hundreds, tens, units] = [ +block[0], +block[1], +block[2] ];

    if (hundreds + tens + units > 0) {
      if (hundreds > 0) {
        str += ChuSo[hundreds] + " trăm ";
      } else if (i > 0) {
        str += "không trăm ";
      }

      if (tens > 1) {
        str += ChuSo[tens] + " mươi ";
        if (units == 1) str += "mốt ";
        else if (units == 5) str += "lăm ";
        else if (units > 0) str += ChuSo[units] + " ";
      } else if (tens == 1) {
        str += "mười ";
        if (units == 1) str += "một ";
        else if (units == 5) str += "lăm ";
        else if (units > 0) str += ChuSo[units] + " ";
      } else if (units > 0) {
        if (hundreds > 0 || i > 0) str += "lẻ ";
        if (units == 5) str += "năm ";
        else str += ChuSo[units] + " ";
      }

      str += Tien[blocks.length - 1 - i] + " ";
      chu.push(str.trim());
    }
  });

  // Ghép kết quả + xử lý dấu phẩy và in hoa ký tự đầu
  return (
    chu.join(", ").replace(/, (?=[^,]*$)/, " ") + " đồng."
  ).replace(/\s+/g, " ").replace(/^\w/, c => c.toUpperCase());
}

class CustomElectricBillCard extends HTMLElement {
  set hass(hass) {
    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const kwh = parseFloat(state?.state || 0);

    const bac = [0, 0, 0, 0, 0, 0];
    const max = [50, 50, 100, 100, 100];
    let remaining = kwh;

    for (let i = 0; i < 5; i++) {
      bac[i] = Math.min(remaining, max[i]);
      remaining -= bac[i];
    }
    bac[5] = Math.max(remaining, 0);

    const storageKey = 'customElectricBillPrices';
	const defaultPrices = [1984, 2050, 2380, 2998, 3350, 3460];
	this.prices = Array.isArray(this.config.prices) && this.config.prices.length === 6
	  ? this.config.prices.map(p => parseFloat(p))
	  : defaultPrices;


    const tien = bac.map((val, i) => val * this.prices[i]);
    const tong = tien.reduce((a, b) => a + b, 0);
    const thue = tong * 0.08;
    const tongcong = tong + thue;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();
	const storedDays = parseInt(this.config.used_days) || lastDay;
	const avgKwh = kwh / storedDays;
	const avgCost = tongcong / storedDays;

	if (!document.getElementById('responsive-electric-card-style')) {
	  const style = document.createElement('style');
	  style.id = 'responsive-electric-card-style';
	  style.textContent = `
		.responsive-electric-card {
		  font-size: clamp(14px, 1.5vw, 20px);
		}
		.responsive-electric-card h1, 
		.responsive-electric-card h2, 
		.responsive-electric-card h3 {
		  font-size: clamp(18px, 2vw, 26px);
		}
		.responsive-electric-card td, 
		.responsive-electric-card th {
		  font-size: clamp(13px, 1.2vw, 18px);
		}
		.responsive-electric-card button {
		  font-size: clamp(13px, 1.5vw, 18px);
		}
	  `;
	  document.head.appendChild(style);
	}

	const colors = [
		"#4EA72E", // xanh lá
		"#66C23A",
		"#f6c343",
		"#f39c12",
		"#e67e22",
		"#EE0000"  // đỏ
	];
    this.innerHTML = `
	  <ha-card class="responsive-electric-card" header="${this.config.title ? `${this.config.title} tháng ${month + 1}/${year}` : `Chi tiết tiền điện tháng ${month + 1}/${year}`}" style=" --ha-card-header-font-size: clamp(18px, 2.5vw, 26px); --ha-card-padding: 5px; font-family: Roboto, Arial, sans-serif;">
        <table style="width:100%; border-collapse: collapse;">
          <tr style="background:#eee;">
            <th style="border: 1px solid #ccc; padding: 6px; color: red;">Bậc<br>(<a href="https://www.evn.com.vn/d/vi-VN/news/Bieu-gia-ban-le-dien-theo-Quyet-dinh-so-1279QD-BCT-ngay-0952025-cua-Bo-Cong-Thuong-60-28-502668" target="_blank">🌐</a>)</th>
            <th style="border: 1px solid #ccc; padding: 6px; color: red;">Đơn giá<br>(đ)</th>
            <th style="border: 1px solid #ccc; padding: 6px; color: red;">Sản lượng<br>(kWh)</th>
            <th style="border: 1px solid #ccc; padding: 6px; color: red;">Thành tiền<br>(đ)</th>
          </tr>
          ${bac.map((val, i) =>
            val > 0 ? `
              <tr style="background-color:${colors[i]}; color:white;">
                <td style="border: 1px solid #ccc; text-align:center;">${i + 1}</td>
                <td style="border: 1px solid #ccc; text-align:center;">
                  ${this.prices[i].toLocaleString()}
                </td>
                <td style="border: 1px solid #ccc; text-align:center;">${val.toFixed(0)}</td>
                <td style="border: 1px solid #ccc; text-align:right; padding-right:5px;">${Math.round(tien[i]).toLocaleString()}</td>
              </tr>` : ''
          ).join('')}

          <tr style="background:#eee;">
            <td colspan="2" style="padding-right: 30px; text-align:right;  border-bottom: 1px solid rgba(204, 204, 204, 0.4); color: red;"><b>Tổng kWh:</b></td>
            <td style="text-align:right; color: red; border-bottom: 1px solid rgba(204, 204, 204, 0.4); padding-right:5px;"><strong>${kwh.toFixed(0)}</strong></td>
            <td style="text-align:center; border-bottom: 1px solid rgba(204, 204, 204, 0.4); color: red;"><strong>kWh</strong></td>
          </tr>
          <tr>
            <td colspan="2" style="padding-right: 30px; text-align:right; border-bottom: 1px solid rgba(204, 204, 204, 0.4);"><b>Tổng tiền:</b></td>
            <td style="text-align:right; border-bottom: 1px solid rgba(204, 204, 204, 0.4); padding-right:5px;"><strong>${Math.round(tong).toLocaleString()}</strong></td>
            <td style="text-align:center; border-bottom: 1px solid rgba(204, 204, 204, 0.4);"><strong>đ</strong></td>
          </tr>
          <tr>
            <td colspan="2" style="padding-right: 30px; text-align:right; border-bottom: 1px solid rgba(204, 204, 204, 0.4);"><b>VAT (8%):</b></td>
            <td style="text-align:right; border-bottom: 1px solid rgba(204, 204, 204, 0.4); padding-right:5px;"><strong>${Math.round(thue).toLocaleString()}</strong></td>
            <td style="text-align:center; border-bottom: 1px solid rgba(204, 204, 204, 0.4);"><strong>đ</strong></td>
          </tr>
          <tr style="background:#eee;">
            <td colspan="2" style="padding-right: 30px; text-align:right; border-bottom: 1px solid rgba(204, 204, 204, 0.4); color: red;"><b>Thanh toán:</b></td>
            <td style="text-align:right; color: red; border-bottom: 1px solid rgba(204, 204, 204, 0.4); padding-right:5px;"><strong>${Math.round(tongcong).toLocaleString()}</strong></td>
            <td style="text-align:center; border-bottom: 1px solid rgba(204, 204, 204, 0.4); color: red;"><strong>đ</strong></td>
          </tr>
          <tr style="background:#fff9c4;">
            <td colspan="4" style="font-style: italic; color: red; text-align:center; font-family: Roboto, Arial, sans-serif;">
              Bằng chữ:<b> ${convertNumberToVietnameseWords(Math.round(tongcong))}</b>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding-right: 30px; text-align:right; padding-top: 20px;">
			  Tổng <span style="color: red;"><strong>${storedDays}</strong></span> ngày
			</td>
            <td style="text-align:right; padding-top: 20px;"><span style="background:#fff9c4; display:inline-block; box-sizing: border-box; width:100%; color: red; padding-right:5px;"><strong>${avgKwh.toFixed(2)}</strong></span></td>
            <td style="text-align:right; padding-top: 20px;"><span style="background:#fff9c4; display:inline-block; box-sizing: border-box; width:100%; color: red; padding-right:5px;">kWh/ngày</td>
          </tr>
          <tr>
            <td colspan="2"></td>
            <td style="text-align:right;"><span style="background:#fff9c4; display:inline-block; box-sizing: border-box; width:100%; color: red; padding-right:3px;"><strong>${Math.round(avgCost).toLocaleString()}</strong></span></td>
            <td style="text-align:right;"><span style="background:#fff9c4; display:inline-block; box-sizing: border-box; width:100%; color: red; padding-right:5px;">đ/ngày</span></td>
          </tr>
          <tr style="text-align:center; font-size: 10px; color: gray; background:#eee;">
            <td colspan="4">
			  Đơn giá lấy từ EVN cho điện sinh hoạt.<br>Dùng tạm tính cho sản lượng điện tự theo dõi bằng thiết bị của bạn.
			</td>
          </tr>
        </table>
      </ha-card>
    `;

  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Bạn cần cấu hình entity");
    }
    this.config = config;
  }

  getCardSize() {
    return 5;
  }
}
customElements.define('evnvn-electricity-consumption-card', CustomElectricBillCard);
