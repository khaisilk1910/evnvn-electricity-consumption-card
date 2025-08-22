# Thẻ hiển thị Sản Lượng và Thành Tiền theo từng Bậc giá điện của EVN Việt Nam
<img width="1226" height="601" alt="image" src="https://github.com/user-attachments/assets/0ed38e82-8766-4d7a-a647-c8354893efce" />


## Hướng dẫn:
1. Cài qua HACS
   - Vào HACS
   - Vào 3 Chấm góc trên bên phải
   - Chọn **Custom repositories**
     
     <img width="303" height="437" alt="image" src="https://github.com/user-attachments/assets/71489d94-bc79-4f12-9941-9c1ce56152e8" />

   - Điền và chọn Dashboard và nhấn Add

     ```
     https://github.com/khaisilk1910/evnvn-electricity-consumption-card
     ```
     
     <img width="445" height="547" alt="image" src="https://github.com/user-attachments/assets/8408ac80-b479-4a0d-a753-37988a7321a0" />

   - Quay lại HACS và nhập ô tìm kiếm và Tải về
     ```
     Bảng Theo Dõi Sản Lượng Tiêu Thụ Điện
     ```
     
     <img width="1640" height="275" alt="image" src="https://github.com/user-attachments/assets/1fdb9e13-c98a-4a42-87f0-dee774505502" />
        
   - Sau đó quay trở lại Dashboard mà bạn muốn thêm một thẻ mới.
     
   - Vào Edit Dashboard
   
   - Thêm thẻ mới và điền
```
type: custom:evnvn-electricity-consumption-card
entity: sensor.tongou_bo_energy_monthly #Thay bằng sensor sản lượng tháng của bạn
title: Công tơ Bố
used_days: 15 #Để trống (hoặc điền null) nếu không muốn giới hạn số ngày muốn tính. Sẽ tự động lấy số ngày trong tháng hiện tại
prices:
  - 1984 #Giá bậc 1
  - 2050 #Giá bậc 2
  - 2380 #Giá bậc 3
  - 2998 #Giá bậc 4
  - 3350 #Giá bậc 5
  - 3460 #Giá bậc 6
```

<img width="1025" height="739" alt="image" src="https://github.com/user-attachments/assets/96e93c99-d9a5-4fc2-92eb-ea9913acd7e5" />

