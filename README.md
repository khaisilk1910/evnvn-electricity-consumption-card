# Thẻ hiển thị Sản Lượng và Thành Tiền theo từng Bậc giá điện của EVN Việt Nam
<img width="1226" height="601" alt="image" src="https://github.com/user-attachments/assets/0ed38e82-8766-4d7a-a647-c8354893efce" />


## Hướng dẫn:
1. Cài qua HACS
   - Vào HACS
   - Vào 3 Chấm góc trên bên phải
   - Chọn **Custom repositories**
     
     <img width="303" height="437" alt="image" src="https://github.com/user-attachments/assets/71489d94-bc79-4f12-9941-9c1ce56152e8" />

   - Điền ```https://github.com/khaisilk1910/evnvn-electricity-consumption-card``` và chọn Dashboard và nhấn Add
     
     <img width="445" height="547" alt="image" src="https://github.com/user-attachments/assets/8408ac80-b479-4a0d-a753-37988a7321a0" />

   - Quay lại HACS và nhập ô tìm kiếm ```Bảng Theo Dõi Sản Lượng Tiêu Thụ Điện``` và Tải về
     
     <img width="1640" height="275" alt="image" src="https://github.com/user-attachments/assets/1fdb9e13-c98a-4a42-87f0-dee774505502" />
        
   - Sau đó quay trở lại Dashboard mà bạn muốn thêm một thẻ mới.
     
   - Vào Edit Dashboard
     
     <img width="172" height="110" alt="image" src="https://github.com/user-attachments/assets/2447c0e3-0b85-4351-a8ed-51643e3e766c" />
     
   - Thêm thẻ mới và điền
     ```
     type: custom:custom-electric-bill-card-total-days
     entity: sensor.tongou_bo_energy_monthly
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
     <img width="1025" height="764" alt="image" src="https://github.com/user-attachments/assets/25ff473f-812d-4c6d-94d1-8a3b4f9ed4bc" />
