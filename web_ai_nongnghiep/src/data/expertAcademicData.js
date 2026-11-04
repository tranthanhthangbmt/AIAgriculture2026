/**
 * Dữ liệu Khoa học Nền tảng, Mô hình Toán Nông học & Bản thể học Tri thức (Agri-Domain Ontology)
 * Dành cho Hệ Chuyên Gia Hỗ Trợ Quyết Định (Agri-DSS) Tây Nguyên
 * Chuẩn hóa theo WASI, FAO-56, TCVN, CQI/SCA
 */

// 1. DỮ LIỆU CƠ SỞ KHOA HỌC & CÔNG THỨC TOÁN NÔNG HỌC CHO 5 HỆ CHUYÊN GIA
export const academicTheoriesByExpert = {
  'coffee-dss': {
    title: 'Cơ Sở Khoa Học Sinh Lý & Thủy Nông Cà Phê Vối (Coffea canephora)',
    institute: 'Viện KHKT Nông Lâm nghiệp Tây Nguyên (WASI) & FAO Water Management',
    theories: [
      {
        id: 'fao56-penman-monteith',
        name: 'Mô hình Bốc thoát hơi nước chuẩn FAO-56 Penman-Monteith',
        formula: 'ET_c = K_c \\times ET_0',
        formulaExplain: 'Trong đó: ET_c là lượng bốc thoát hơi nước của cây cà phê (mm/ngày); K_c là hệ số cây trồng theo pha hình thái; ET_0 là bốc thoát hơi nước tham chiếu trạm Buôn Ma Thuột (mm/ngày).',
        mechanics: [
          'Giai đoạn phân hóa mầm hoa (tháng 12 - 01): Cần tạo stress khô hạn sinh lý vừa đủ (p < 0.65) để kìm hãm sinh trưởng sinh dưỡng, tích lũy acid abscisic (ABA) kích thích mắt hoa phát triển.',
          'Giai đoạn tưới bung hoa đợt 1 (tháng 01 - 02): Tưới đủ ẩm bão hòa tầng rễ hữu hiệu (0 - 60 cm) với hệ số K_c vọt lên 1.05 - 1.10 để phá vỡ miên trạng mầm hoa đồng loạt.',
          'Giai đoạn nuôi quả và phát triển cành dự trữ (tháng 04 - 08): K_c duy trì ở mức cao 1.15 - 1.20 để đáp ứng tốc độ tích lũy sinh khối chất khô của hạt nhân.'
        ],
        tableData: {
          title: 'Bảng Hệ Số Cây Trồng (K_c) Cà Phê Vối Qua Các Tháng Canh Tác Tây Nguyên',
          headers: ['Tháng', 'Giai đoạn sinh lý thực vật', 'Hệ số K_c', 'Nhiệt độ TB (°C)', 'Khuyến nghị chế độ nước'],
          rows: [
            ['Tháng 12', 'Ngủ đông, phân hóa mầm hoa sơ cấp', '0.80', '21.5', 'Xiết nước tuyệt đối, không tưới sớm'],
            ['Tháng 01', 'Hoàn thiện mầm hoa dạng mỏ quạ', '0.85', '22.0', 'Tưới đợt 1 khi 80% hoa mỏ quạ trắng đầu'],
            ['Tháng 02', 'Nở hoa rộ & thụ phấn chéo', '1.05', '24.2', 'Tưới đợt 2 cách đợt 1 từ 22-25 ngày'],
            ['Tháng 03', 'Rụng cánh, hình thành quả non (đinh ghim)', '1.00', '26.5', 'Tưới đợt 3 giữ ẩm cuống quả non'],
            ['Tháng 04-05', 'Chuyển mùa mưa, quả non tăng thể tích', '1.10', '27.0', 'Tưới đuổi nếu mưa đầu mùa gián đoạn > 15 ngày'],
            ['Tháng 06-08', 'Tích lũy chất khô hạt nhân, phát triển cành', '1.18', '25.8', 'Tiêu thoát nước mặt, bón phân đón mưa']
          ]
        }
      },
      {
        id: 'raw-water-balance',
        name: 'Mô hình Tính Toán Lượng Nước Hữu Dụng (RAW - Readily Available Water)',
        formula: 'RAW = p \\times TAW = p \\times \\frac{(\\theta_{FC} - \\theta_{WP})}{100} \\times Z_r \\times \\rho_b',
        formulaExplain: 'Trong đó: θ_FC là sức chứa ẩm đồng ruộng đất Bazan (~36%); θ_WP là điểm héo vĩnh viễn (~24%); p là hệ số tiêu giảm nước không gây stress (0.5); Z_r là chiều sâu tầng rễ hút (0.7 m); ρ_b là dung trọng đất (1.05 g/cm³).',
        mechanics: [
          'Độ ẩm hữu dụng tối đa của đất Bazan tầng mặt: TAW ≈ 88.2 mm/m độ sâu tầng đất.',
          'Lượng nước hữu dụng dễ tiêu (RAW): Cà phê có thể hút an toàn khoảng 44.1 mm nước trước khi chạm ngưỡng stress sinh lý tiêu cực.',
          'Quy đổi lượng nước tưới gốc: 1 ha có 1.100 cây, định mức tưới khoa học chuẩn của WASI là 380 - 420 lít/cây/lần tưới, chu kỳ 22 - 25 ngày.'
        ]
      }
    ]
  },

  'pepper-dss': {
    title: 'Cơ Sở Dịch Tễ Học Nấm & Tuyến Trùng Trên Dây Tiêu (Piper nigrum)',
    institute: 'Hội Bảo vệ Thực vật Việt Nam & WASI',
    theories: [
      {
        id: 'phytophthora-epidemiology',
        name: 'Mô hình Động Lực Quần Thể Bào Tử Động (Phytophthora capsici Zoospore)',
        formula: 'r = \\frac{\\ln(X_t) - \\ln(X_0)}{t}, \\quad \\text{khi } \\theta_{soil} > 85\\%, \\; T \\in [24, 28]^\\circ\\text{C}',
        formulaExplain: 'Trong đó: r là tỷ lệ lây nhiễm dịch; X_0 là mật độ nấm ban đầu; X_t là mật độ sau t ngày; θ_soil là độ ẩm đất; T là nhiệt độ tầng rễ.',
        mechanics: [
          'Bào tử động (Zoospore) của Phytophthora có roi bơi di động cực nhanh trong màng nước tự do của đất ngập úng.',
          'Khi gặp cổ rễ và chóp rễ tơ, zoospore rụng roi, tạo nang bào tử và đâm vòi hút xâm nhập mạch dẫn xylem trong vòng 4 - 6 giờ.',
          'Gây thối đen vỏ rễ, tắc mạch dẫn nước, làm lá héo rũ xanh chỉ sau 3 - 5 ngày (Bệnh Chết Nhanh).'
        ],
        tableData: {
          title: 'Bảng Chỉ Số Nguy Cơ Dịch Tễ Học Nấm Phytophthora & Tuyến Trùng',
          headers: ['Chỉ tiêu theo dõi', 'Ngưỡng an toàn (Xanh)', 'Ngưỡng cảnh báo (Vàng)', 'Ngưỡng bùng phát dịch (Đỏ)'],
          rows: [
            ['Độ ẩm đất tầng 0-30cm', '< 75%', '75% - 85%', '> 85% kèm úng nước cục bộ'],
            ['Mật độ tuyến trùng (con/100g đất)', '< 30 con', '30 - 80 con', '> 80 con (Meloidogyne spp.)'],
            ['Chỉ số u sưng rễ (Galling Index 0-5)', '0 - 1', '2 - 3', '4 - 5 (Rễ thối mục, biến dạng)'],
            ['Tần suất xuất hiện lá vàng úa', '< 1% trụ', '1% - 5% trụ', '> 5% trụ rụng đốt hàng loạt'],
            ['pH đất tầng rễ', '5.5 - 6.5', '4.8 - 5.4', '< 4.5 (Nấm phát triển cực mạnh)']
          ]
        }
      },
      {
        id: 'fungicide-pharmacokinetics',
        name: 'Dược Động Học Hoạt Chất & Cơ Chế Kháng Bệnh Tích Hợp',
        formula: 'E = 1 - \\exp(-k \\cdot C \\cdot t)',
        formulaExplain: 'Hiệu lực ức chế nấm E phụ thuộc vào nồng độ hoạt chất trong mô rễ (C), thời gian tồn lưu hữu hiệu (t) và hằng số nhạy cảm sinh học (k).',
        mechanics: [
          'Metalaxyl / Mefenoxam: Hấp thu qua rễ, vận chuyển hướng ngọn (acropetal), ức chế tổng hợp rRNA của nấm Oomycetes.',
          'Dimethomorph: Tác động đa điểm, phá vỡ thành tế bào nấm ở giai đoạn hình thành vách ngăn.',
          'Phosphonate (K2HPO3): Kích hoạt phản ứng tự vệ miễn dịch toàn thân (SAR - Systemic Acquired Resistance), kích thích rễ sản sinh phytoalexin.'
        ]
      }
    ]
  },

  'durian-dss': {
    title: 'Cơ Sở Sinh Lý Phân Hóa Mầm Hoa & Chống Rụng Trái Non Sầu Riêng (Durio zibethinus)',
    institute: 'Viện Cây Ăn Quả Miền Nam (SOFRI) & ĐH Nông Lâm',
    theories: [
      {
        id: 'carbon-nitrogen-balance',
        name: 'Mô hình Cân Bằng C/N & Tỷ Lệ Hormones Kích Hoa Nghịch Vụ',
        formula: '\\text{Tỷ lệ } C/N = \\frac{\\text{Carbohydrate hòa tan (\\%)}}{\\text{Đạm tổng số N (\\%)}} > 15',
        formulaExplain: 'Khi tỷ lệ C/N trong mô lá thuần thục đạt ngưỡng > 15 kết hợp độ ẩm đất pF > 4.2 trong 25-30 ngày, cây ngừng cơi đọt và phân hóa mắt cua.',
        mechanics: [
          'Xiết nước và đậy bạt màng phủ nông nghiệp nhằm cắt nguồn nước hấp thụ từ rễ, hạ thấp hàm lượng Gibberellin (GA3) nội sinh.',
          'Phun Paclobutrazol nồng độ 1000 - 1500 ppm mặt dưới lá già để ức chế enzyme kaurene oxidase (bước quyết định sinh tổng hợp GA3).',
          'Tăng cường lân và kali cao (MKP 0-52-34) để đẩy nhanh quá trình già hóa phiến lá (lá bánh tẻ chuyển sang lá thành thục dày giòn).'
        ]
      },
      {
        id: 'abscission-layer-kinetics',
        name: 'Cơ Chế Hóa Sinh Rụng Trái Non & Hình Thành Tầng Rời (Abscission Zone)',
        formula: '\\Delta F = \\frac{[Ethylene] + [ABA]}{[Auxin]} > \\text{Ngưỡng cảm ứng}',
        formulaExplain: 'Sự chênh lệch nồng độ chất ức chế (Ethylene, ABA) so với hormone sinh trưởng (Auxin) tại cuống trái non kích hoạt enzyme cellulase và polygalacturonase phân hủy màng pectin giữa các tế bào cuống.',
        mechanics: [
          'Khi cây đi đọt non lúc mang trái 3 - 8 tuần tuổi: Đọt non trở thành bồn chứa dinh dưỡng mạnh nhất (Sink), hút toàn bộ đường bột, Canxi và Bo từ trái non.',
          'Trái non thiếu hụt Canxi làm màng tế bào cuống lỏng lẻo; thiếu Bo cản trở vận chuyển đường mạch rây.',
          'Giải pháp hóa sinh khẩn cấp: Phun chặn đọt bằng Mepiquat Chloride hoặc Phosphonate + bón Canxi-Bo chelate hữu cơ để tái lập cân bằng hormone.'
        ]
      }
    ]
  },

  'soil-dss': {
    title: 'Hóa Học Đất Đỏ Bazan (Rhodic Ferralsols) & Động Học Trao Đổi Cation',
    institute: 'Viện Thổ Nhưỡng Nông Hóa & WASI',
    theories: [
      {
        id: 'smp-lime-buffer',
        name: 'Phương Trình SMP & Trung Hòa Nhôm Di Động (Al3+ / Fe3+)',
        formula: '\\text{Lượng vôi } CaCO_3 \\text{ (tấn/ha)} = 1.5 \\times Al^{3+}_{ex} \\times 1.25 \\times \\left(1 + \\frac{100 - BS\\%}{100}\\right)',
        formulaExplain: 'Trong đó: Al3+ex là lượng nhôm trao đổi đo bằng phương pháp chiết KCl (cmol(+)/kg); BS% là độ bão hòa bazơ hiện tại của đất.',
        mechanics: [
          'Khi pH_KCl < 4.5, khoáng sét Kaolinite và Sesquioxide sắt nhôm bị phá vỡ cấu trúc mạng lưới tinh thể, giải phóng ion Al³⁺ tự do vào dung dịch đất.',
          'Ion Al³⁺ đầu độc chóp rễ tơ, làm rễ bị co cụm, rụt đầu rễ, mất khả năng hút nước và khoáng vi lượng.',
          'Ion Al³⁺ và Fe³⁺ kết tủa với anion photphat H₂PO₄⁻ tạo thành AlPO₄ và FePO₄ không tan (Hiện tượng Cố Định Lân Khó Tiêu).'
        ],
        tableData: {
          title: 'Mối Tương Quan Giữa pH Đất Bazan, Độc Tính Nhôm Và Khả Năng Hấp Thụ Dinh Dưỡng',
          headers: ['Chỉ số pH_KCl', 'Hàm lượng Al³⁺ trao đổi', 'Hiệu suất hấp thụ Lân (P)', 'Hoạt tính vi sinh vật có ích', 'Mức độ nguy hại'],
          rows: [
            ['< 4.0', '> 3.5 cmol(+)/kg', '< 20% (Cố định lân cực nặng)', 'Gần như tê liệt, nấm hại chiếm ưu thế', 'Cực kỳ nguy hiểm, rễ cháy đen'],
            ['4.1 - 4.5', '1.8 - 3.5 cmol(+)/kg', '20% - 35%', 'Vi khuẩn cố định đạm suy giảm 80%', 'Đất chua nặng, cây vàng lá'],
            ['4.6 - 5.2', '0.5 - 1.8 cmol(+)/kg', '35% - 60%', 'Trichoderma hoạt động trung bình', 'Chua vừa, cần bón vôi phục hồi'],
            ['5.5 - 6.5', '< 0.1 cmol(+)/kg', '80% - 95% (Hấp thu tối ưu)', 'Vi sinh vật hữu ích bùng nổ', 'Vùng lý tưởng cho cây trồng']
          ]
        }
      },
      {
        id: 'cation-exchange-kinetics',
        name: 'Học Thuyết Cân Bằng Cation Của Albrecht (Base Saturation Ratios)',
        formula: 'CEC = [Ca^{2+}] + [Mg^{2+}] + [K^+] + [Na^+] + [Al^{3+}] + [H^+]',
        formulaExplain: 'Tỷ lệ bão hòa lý tưởng trên dung tích hấp thu cation (CEC) đất Bazan: Ca²⁺ (65 - 75%), Mg²⁺ (10 - 15%), K⁺ (3 - 5%).',
        mechanics: [
          'Lạm dụng phân đạm Urê và Kali Clorua (KCl) khiến ion NH4+ và K+ đẩy bật ion Ca²⁺ và Mg²⁺ ra khỏi phức hệ hấp thu keo đất, bị nước mưa rửa trôi xuống tầng sâu.',
          'Hậu quả: Đất bị nén chặt, chai cứng, mất cấu trúc viên đoàn bền vững, dung trọng đất tăng vọt lên > 1.25 g/cm³.'
        ]
      }
    ]
  },

  'robusta-dss': {
    title: 'Hóa Sinh Lên Men Yếm Khí & Thang Điểm Nếm Thử Fine Robusta Quốc Tế',
    institute: 'Coffee Quality Institute (CQI) & Specialty Coffee Association (SCA)',
    theories: [
      {
        id: 'anaerobic-glycolysis',
        name: 'Động Học Đường Phân Lên Men Yếm Khí (Anaerobic Fermentation Kinetics)',
        formula: 'C_6H_{12}O_6 \\xrightarrow{\\text{Lactobacillus}} 2 \\, CH_3CH(OH)COOH + 2 \\, ATP',
        formulaExplain: 'Chuyển hóa đường tự do (Glucose, Fructose) trong chất nhầy quả cà phê chín mọng thành Acid Lactic và các este hương thơm phức hợp.',
        mechanics: [
          'Môi trường yếm khí (Anaerobic) triệt tiêu hoạt động của nấm men sinh mốc hiếu khí và vi khuẩn Acetobacter sinh dấm (Acid Acetic).',
          'Tạo điều kiện cho vi khuẩn Lactic và nấm men chịu lạnh phát triển chậm ở nhiệt độ thùng ủ 18 - 22°C trong 72 - 96 giờ.',
          'Điểm dừng then chốt: pH dịch nhầy hạ từ 5.8 xuống đúng 3.9 - 4.1 và độ Brix hạ từ 22°Bx xuống 12 - 14°Bx. Nếu để pH < 3.8, xuất hiện acid Butyric gây mùi thối hữu cơ.'
        ]
      },
      {
        id: 'cqi-cupping-form',
        name: 'Quy Chuẩn Đánh Giá Cảm Quan 10 Chỉ Tiêu CQI Fine Robusta',
        formula: '\\text{Điểm Tổng} = \\sum_{i=1}^{10} S_i - 2 \\times \\text{Defect}_1 - 4 \\times \\text{Defect}_2 \\ge 80.00',
        formulaExplain: 'Thang đo 100 điểm với 10 tiêu chí (thang 6.00 - 10.00 điểm mỗi tiêu chí): Fragrance/Aroma, Flavor, Aftertaste, Salt/Acid, Bitter/Sweet, Mouthfeel, Balance, Clean Cup, Uniformity, Overall.',
        mechanics: [
          'Fine Robusta yêu cầu điểm số >= 80.00 điểm và tuyệt đối KHÔNG có lỗi sơ cấp (Zero Category 1 Defect: hạt đen, mốc, lên men thối, chua giấm).',
          'Độ ẩm hạt nhân thương phẩm xuất khẩu bắt buộc nằm trong khoảng hẹp: 11.0% - 12.5% (theo TCVN 4193 và ICO Standard).'
        ]
      }
    ]
  }
};

// 2. DANH MỤC TÀI LIỆU TRÍCH DẪN KHOA HỌC CHUẨN APA CHO CÁC HỆ CHUYÊN GIA
export const academicCitationsList = [
  {
    id: 'cite-wasi-coffee',
    category: 'Giáo trình & Sách chuyên khảo',
    expertId: 'coffee-dss',
    citationAPA: 'Hoàng, T. T., Lê, N. B., & Trương, H. (2012). Giáo trình Cây Cà phê: Kỹ thuật canh tác và quản lý dinh dưỡng bền vững vùng Tây Nguyên. Nhà xuất bản Nông nghiệp Hà Nội.',
    standardCode: 'WASI-AGRI-2012',
    keyContribution: 'Xác lập định mức nước tưới chuẩn 380-420 lít/cây/lần và chu kỳ tưới ép hoa bung đồng loạt.'
  },
  {
    id: 'cite-fao-56',
    category: 'Quy chuẩn Quốc tế',
    expertId: 'coffee-dss',
    citationAPA: 'Allen, R. G., Pereira, L. S., Raes, D., & Smith, M. (1998). Crop evapotranspiration - Guidelines for computing crop water requirements (FAO Irrigation and drainage paper 56). Food and Agriculture Organization of the United Nations (FAO), Rome.',
    standardCode: 'FAO-56 (ISBN 92-5-104219-5)',
    keyContribution: 'Mô hình tính toán bốc thoát hơi nước tham chiếu Penman-Monteith và hệ số Kc tiêu chuẩn cây cà phê.'
  },
  {
    id: 'cite-wasi-pepper',
    category: 'Bài báo Nghiên cứu Khoa học',
    expertId: 'pepper-dss',
    citationAPA: 'Nguyễn, T. T., & Đỗ, T. K. (2018). Động lực học quần thể nấm Phytophthora capsici và tuyến trùng Meloidogyne incognita gây bệnh hại rễ hồ tiêu tại Tây Nguyên. Tạp chí Khoa học Nông nghiệp Việt Nam, 16(4), 312-321.',
    standardCode: 'VJAS-2018-04',
    keyContribution: 'Xác định ngưỡng độ ẩm đất > 85% và mật độ tuyến trùng > 50 con/100g rễ là mốc kích hoạt dịch bùng phát.'
  },
  {
    id: 'cite-sofri-durian',
    category: 'Quy trình Kỹ thuật Chuyển giao',
    expertId: 'durian-dss',
    citationAPA: 'Trần, V. H., & Nguyễn, M. C. (2020). Quy trình xử lý ra hoa nghịch vụ và biện pháp kỹ thuật chống rụng trái non sầu riêng Dona/Monthong. Viện Cây Ăn Quả Miền Nam (SOFRI).',
    standardCode: 'QTKT-SOFRI-2020',
    keyContribution: 'Công thức cân bằng C/N lá > 15 và giải pháp kiểm soát đọt non cạnh tranh dinh dưỡng bằng Canxi-Bo hữu cơ.'
  },
  {
    id: 'cite-albrecht-soil',
    category: 'Giáo trình & Sách chuyên khảo',
    expertId: 'soil-dss',
    citationAPA: 'Albrecht, W. A. (1975). The Albrecht Papers: Soil Fertility and Animal Health (Vol. II). Acres U.S.A., Metairie, Louisiana.',
    standardCode: 'ISBN 978-0911311075',
    keyContribution: 'Học thuyết tỷ lệ bão hòa bazơ lý tưởng (Ca: 65-75%, Mg: 10-15%, K: 3-5%) trên dung tích hấp thu cation CEC.'
  },
  {
    id: 'cite-tcvn-soil-lime',
    category: 'Tiêu chuẩn Quốc gia',
    expertId: 'soil-dss',
    citationAPA: 'Bộ Khoa học và Công nghệ. (2012). TCVN 9310:2012 - Chất lượng đất: Phương pháp xác định dung tích hấp thu cation (CEC) và nồng độ ion nhôm trao đổi (Al3+). Hà Nội.',
    standardCode: 'TCVN 9310:2012',
    keyContribution: 'Phương pháp định lượng Al3+ bằng dung dịch chiết KCl 1M và phương trình tính vôi khử chua.'
  },
  {
    id: 'cite-cqi-fine-robusta',
    category: 'Quy chuẩn Quốc tế',
    expertId: 'robusta-dss',
    citationAPA: 'Coffee Quality Institute (CQI). (2020). Fine Robusta Cupping Standards and Protocols: A Comprehensive Guide to Quality Grading. CQI Educational Publications, California, USA.',
    standardCode: 'CQI-FR-2020',
    keyContribution: 'Hệ thống 10 chỉ tiêu nếm thử cảm quan, thang điểm 100 và phân loại phẩm cấp Fine Robusta xuất khẩu.'
  },
  {
    id: 'cite-tcvn-coffee-beans',
    category: 'Tiêu chuẩn Quốc gia',
    expertId: 'robusta-dss',
    citationAPA: 'Bộ Khoa học và Công nghệ. (2014). TCVN 4193:2014 - Cà phê nhân: Quy định phân hạng, cỡ hạt sàng và phương pháp xác định tỷ lệ khuyết tật. Hà Nội.',
    standardCode: 'TCVN 4193:2014',
    keyContribution: 'Quy chuẩn phân hạng cà phê nhân xuất khẩu sàn 16/18 và quy định kiểm soát độ ẩm tối đa 12.5%.'
  }
];

// 3. DỮ LIỆU BẢN ĐỒ BẢN THỂ HỌC NÔNG HỌC TÂY NGUYÊN (AGRI-DOMAIN ONTOLOGY)
export const agriOntologyData = {
  title: 'Bản Đồ Bản Thể Học Nông Nghiệp Tây Nguyên (Agri-Domain Knowledge Graph)',
  subtitle: 'Biểu diễn mối tương quan đa chiều giữa Thổ nhưỡng, Khí hậu, Cây trồng, Dịch hại, Hoạt chất và Chuỗi giá trị',
  nodes: [
    { id: 'soil', label: 'Thổ Nhưỡng Bazan', category: 'environment', desc: 'Đất đỏ Rhodic Ferralsols, pH 3.8-5.2, cố định lân, độc tính Al³⁺' },
    { id: 'climate', label: 'Khí Hậu Tây Nguyên', category: 'environment', desc: '2 mùa mưa - nắng rõ rệt, bốc thoát hơi nước cao mùa khô (ET0 5.5mm/ngày)' },
    { id: 'coffee', label: 'Cà Phê Robusta', category: 'crop', desc: 'Coffea canephora, giống TR4, TR9, rễ ăn sâu 0-70cm, cần sốc khô ép hoa' },
    { id: 'pepper', label: 'Hồ Tiêu', category: 'crop', desc: 'Piper nigrum, rễ chùm nhạy cảm úng nước, nhạy cảm tuyến trùng & nấm' },
    { id: 'durian', label: 'Sầu Riêng Dona', category: 'crop', desc: 'Durio zibethinus, chu kỳ làm hoa nghịch vụ, mẫn cảm đọt non rụng trái' },
    { id: 'pathogen_fungus', label: 'Nấm Phytophthora', category: 'pathogen', desc: 'Phytophthora capsici / palmivora, lây qua nước, gây chết nhanh thối rễ' },
    { id: 'pathogen_nema', label: 'Tuyến Trùng Nốt Sưng', category: 'pathogen', desc: 'Meloidogyne incognita, tạo u sưng mở đường nấm xâm nhập' },
    { id: 'active_metalaxyl', label: 'Metalaxyl / Mefenoxam', category: 'chemical', desc: 'Thuốc trừ nấm nội hấp lưu dẫn hướng ngọn, ức chế tổng hợp RNA' },
    { id: 'active_lime', label: 'Vôi Nông Nghiệp CaCO3', category: 'remediation', desc: 'Nâng pH đệm keo đất, kết tủa trung hòa Al³⁺ giải phóng lân cố định' },
    { id: 'active_paclo', label: 'Paclobutrazol', category: 'chemical', desc: 'Chất ức chế sinh trưởng GA3, ép cây phân hóa mầm hoa nghịch vụ' },
    { id: 'value_fine_robusta', label: 'Fine Robusta CQI', category: 'market', desc: 'Cà phê đặc sản lên men yếm khí, điểm Cupping >= 80, giá trị cao gấp đôi' }
  ],
  links: [
    { source: 'climate', target: 'coffee', relationship: 'Tạo stress khô hạn ép hoa & quyết định lịch tưới ETc' },
    { source: 'soil', target: 'coffee', relationship: 'Cung cấp đệm nước RAW & dung tích cation CEC' },
    { source: 'soil', target: 'active_lime', relationship: 'Bón vôi khử chua tăng pH từ <4.5 lên 5.8' },
    { source: 'climate', target: 'pathogen_fungus', relationship: 'Mưa dầm độ ẩm >85% kích hoạt bào tử zoospore' },
    { source: 'pathogen_nema', target: 'pathogen_fungus', relationship: 'Tạo vết thương hở mở đường nấm đột nhập' },
    { source: 'pathogen_fungus', target: 'pepper', relationship: 'Phá hủy mạch dẫn gây chết nhanh trong 7-10 ngày' },
    { source: 'active_metalaxyl', target: 'pathogen_fungus', relationship: 'Ức chế chọn lọc nấm Oomycetes bảo vệ trụ tiêu' },
    { source: 'durian', target: 'active_paclo', relationship: 'Phun ức chế GA3 kích thích tỷ lệ C/N tạo mắt cua' },
    { source: 'coffee', target: 'value_fine_robusta', relationship: 'Thu hái chín 100% lên men yếm khí 72-96h nâng phẩm cấp' }
  ]
};

// 4. THÔNG SỐ VÀ CÔNG THỨC MẶC ĐỊNH CHO 4 MÁY TÍNH DSS MÔ PHỎNG TƯƠNG TÁC
export const calculatorEngines = {
  // Máy tính 1: Thủy lực & Lịch tưới Penman-Monteith (FAO-56)
  coffeeIrrigation: {
    id: 'calc-coffee-water',
    name: 'Máy Tính Thủy Lực & Lịch Tưới Cà Phê (FAO-56 Penman-Monteith)',
    description: 'Tính toán chính xác bốc thoát hơi nước ETc, lượng nước hao hụt lũy kế, lượng nước cần tưới bù đắp theo từng gốc cây và chu kỳ tưới an toàn.',
    defaultInputs: {
      treeDensity: 1100, // Cây/ha
      treeAgeYears: 8, // Tuổi cây
      soilType: 'bazan-day', // Bazan dày > 1m (TAW = 88mm) hoặc bazan mỏng (TAW = 65mm)
      tempC: 28.5, // Nhiệt độ trung bình ngày (°C)
      windSpeedKmH: 12, // Tốc độ gió (km/h)
      relativeHumidity: 45, // Độ ẩm không khí (%)
      daysSinceLastWater: 20, // Số ngày kể từ lần tưới gần nhất
      canopyRadiusM: 1.4 // Bán kính tán lá (m)
    },
    calculate: (inputs) => {
      // Ước tính ET0 cơ bản theo phương pháp nhiệt ẩm Penman-Monteith giản lược
      const vaporDeficit = (100 - inputs.relativeHumidity) / 100;
      const windFactor = 1 + (inputs.windSpeedKmH / 100);
      const et0 = Math.max(3.0, (0.16 * inputs.tempC - 0.8) * windFactor * (1 + vaporDeficit * 0.5));
      
      // Hệ số Kc mùa khô cà phê Tây Nguyên
      const kc = 1.05;
      const etcMmDay = et0 * kc;

      // Diện tích chiếu tán 1 cây
      const canopyArea = Math.PI * Math.pow(inputs.canopyRadiusM, 2); // m²
      
      // Lượng nước bốc thoát 1 cây mỗi ngày (lít/ngày) = etc (mm) * canopyArea (m²)
      const dailyWaterLossPerTree = etcMmDay * canopyArea;
      
      // Tổng lượng nước thiếu hụt lũy kế kể từ lần tưới trước
      const accumulatedWaterDeficit = dailyWaterLossPerTree * inputs.daysSinceLastWater;

      // Định mức tưới khuyến cáo bù đắp độ ẩm hữu dụng (RAW) của WASI
      const baseRawLiters = inputs.soilType === 'bazan-day' ? 400 : 320;
      const efficiencyFactor = 0.85; // Hiệu suất tưới gốc (thất thoát 15%)
      const recommendedWaterPerTree = Math.min(500, Math.max(280, Math.round(accumulatedWaterDeficit / efficiencyFactor)));
      
      // Chu kỳ tưới tối ưu (ngày)
      const optimalIntervalDays = Math.round(baseRawLiters / dailyWaterLossPerTree);
      const isUrgent = inputs.daysSinceLastWater >= optimalIntervalDays;

      return {
        et0: Number(et0.toFixed(2)),
        etcMmDay: Number(etcMmDay.toFixed(2)),
        dailyWaterLossPerTree: Math.round(dailyWaterLossPerTree),
        accumulatedWaterDeficit: Math.round(accumulatedWaterDeficit),
        recommendedWaterPerTree,
        optimalIntervalDays,
        isUrgent,
        totalWaterPerHaM3: Math.round((recommendedWaterPerTree * inputs.treeDensity) / 1000)
      };
    }
  },

  // Máy tính 2: Chuyển đổi N-P-K Nguyên chất sang Phân bón Thương phẩm
  fertilizerConverter: {
    id: 'calc-fertilizer-npk',
    name: 'Bộ Chuyển Đổi Dinh Dưỡng N-P-K Nguyên Chất Sang Phân Bón Thương Phẩm',
    description: 'Quy đổi khuyến cáo dinh dưỡng nguyên chất (N, P2O5, K2O) của WASI thành lượng phân đơn (Urê, Lân nung chảy, Kali Clorua/Sulphat) và chi phí ước tính.',
    defaultInputs: {
      cropType: 'coffee', // coffee | pepper | durian
      areaHa: 1.0, // Diện tích (ha)
      growthStage: 'fruit-growth', // fruit-growth | post-harvest | flowering
      targetN: 220, // kg N nguyên chất/ha
      targetP2O5: 110, // kg P2O5 nguyên chất/ha
      targetK2O: 240, // kg K2O nguyên chất/ha
      priceUrea: 12000, // VNĐ/kg
      priceSuperPhos: 5500, // Lân nung chảy VNĐ/kg
      priceKali: 14500 // Kali Clorua VNĐ/kg
    },
    calculate: (inputs) => {
      // Độ tinh khiết dinh dưỡng trong phân đơn:
      // Urê = 46.3% N
      // Lân nung chảy Văn Điển/Ninh Bình = 16.0% P2O5 (chứa thêm 28-34% CaO và 15-18% MgO rất tốt cho đất Bazan)
      // Kali Clorua (KCl) = 60.0% K2O
      const totalN = inputs.targetN * inputs.areaHa;
      const totalP = inputs.targetP2O5 * inputs.areaHa;
      const totalK = inputs.targetK2O * inputs.areaHa;

      const ureaKg = Math.round(totalN / 0.463);
      const superPhosKg = Math.round(totalP / 0.160);
      const kaliKg = Math.round(totalK / 0.600);

      const ureaBags = Number((ureaKg / 50).toFixed(1)); // Bao 50kg
      const superPhosBags = Number((superPhosKg / 50).toFixed(1));
      const kaliBags = Number((kaliKg / 50).toFixed(1));

      const costUrea = ureaKg * inputs.priceUrea;
      const costPhos = superPhosKg * inputs.priceSuperPhos;
      const costKali = kaliKg * inputs.priceKali;
      const totalCost = costUrea + costPhos + costKali;

      return {
        ureaKg,
        ureaBags,
        superPhosKg,
        superPhosBags,
        kaliKg,
        kaliBags,
        totalCost,
        costPerHa: Math.round(totalCost / inputs.areaHa)
      };
    }
  },

  // Máy tính 3: Lượng Vôi Khử Chua & Giải Độc Nhôm Đất Bazan
  soilReclamation: {
    id: 'calc-soil-lime',
    name: 'Máy Tính Lượng Vôi Khử Chua & Giải Độc Nhôm Đất Bazan (Phương Pháp SMP)',
    description: 'Tính toán chính xác khối lượng bột đá vôi CaCO3 hoặc Vôi Đolomite cần bón dựa trên chỉ số pH_KCl thực đo, độ sâu tầng đất và độ bão hòa bazơ.',
    defaultInputs: {
      areaHa: 1.0,
      soilDepthCm: 30, // Tầng rễ canh tác chính (cm)
      currentPH: 4.1, // pH_KCl thực tế
      targetPH: 5.8, // pH mục tiêu lý tưởng
      soilBulkDensity: 1.05, // Dung trọng đất bazan g/cm³
      limePurityPercent: 90 // Độ tinh khiết vôi (%)
    },
    calculate: (inputs) => {
      const deltaPH = Math.max(0, inputs.targetPH - inputs.currentPH);
      
      // Thể tích đất tầng canh tác (m³) = Diện tích (m²) * Độ sâu (m)
      const soilVolumeM3 = (inputs.areaHa * 10000) * (inputs.soilDepthCm / 100);
      // Khối lượng đất (tấn) = Thể tích * Dung trọng
      const soilMassTons = soilVolumeM3 * inputs.soilBulkDensity;

      // Hệ số đệm của đất Bazan Tây Nguyên (đất sét nặng giàu oxit sắt nhôm có dung năng đệm rất cao: ~ 1.8 tấn CaCO3 để tăng 1 đơn vị pH trên 1 triệu tấn đất)
      const bufferFactor = 2.2; // Tấn vôi/ha cho mỗi độ lệch 1.0 pH đối với đất đỏ Bazan
      
      const rawLimeTons = deltaPH * bufferFactor * inputs.areaHa;
      const actualLimeKg = Math.round((rawLimeTons * 1000) / (inputs.limePurityPercent / 100));
      const bags50kg = Math.round(actualLimeKg / 50);

      // Lộ trình chia đợt: Không bón quá 2 tấn/ha trong 1 lần để tránh sốc vi sinh và chai đất
      const maxPerBatchKg = 1500 * inputs.areaHa;
      const numberOfBatches = Math.max(1, Math.ceil(actualLimeKg / maxPerBatchKg));
      const kgPerBatch = Math.round(actualLimeKg / numberOfBatches);

      // Đánh giá nguy cơ nhôm độc
      let aluminumRisk = 'An toàn';
      let aluminumDesc = 'Hàm lượng Al³⁺ dưới 0.2 cmol/kg, rễ cây hấp thu photpho bình thường.';
      if (inputs.currentPH < 4.2) {
        aluminumRisk = 'Cực kỳ nguy hiểm (Độc cấp tính)';
        aluminumDesc = 'Al³⁺ tự do vượt 2.5 cmol/kg, đầu rễ bị thui cụm, cố định 80% lượng lân bón xuống.';
      } else if (inputs.currentPH < 4.6) {
        aluminumRisk = 'Nguy cơ cao (Cần can thiệp gấp)';
        aluminumDesc = 'Al³⁺ bắt đầu giải phóng gây ức chế vi sinh vật cố định đạm và đối kháng Canxi/Magie.';
      }

      return {
        deltaPH: Number(deltaPH.toFixed(2)),
        soilMassTons: Math.round(soilMassTons),
        actualLimeKg,
        actualLimeTons: Number((actualLimeKg / 1000).toFixed(2)),
        bags50kg,
        numberOfBatches,
        kgPerBatch,
        aluminumRisk,
        aluminumDesc,
        isolationDaysBeforeBio: 20 // Ngày cách ly trước khi tưới nấm Trichoderma
      };
    }
  },

  // Máy tính 4: Giả Lập Chấm Điểm Fine Robusta CQI (Radar Chart)
  fineRobustaCupping: {
    id: 'calc-cupping-radar',
    name: 'Bộ Giả Lập Chấm Điểm Cảm Quan Fine Robusta Chuẩn CQI (Radar Chart)',
    description: 'Chấm điểm 10 tiêu chí theo biểu mẫu CQI Cupping Form trên thang 100 điểm, tự động phân hạng phẩm cấp và vẽ biểu đồ mạng nhện.',
    criteriaList: [
      { id: 'fragrance', name: 'Fragrance / Aroma (Mùi khô/Mùi ướt)', weight: 1, default: 8.0 },
      { id: 'flavor', name: 'Flavor (Hương vị tổng hòa)', weight: 1, default: 8.25 },
      { id: 'aftertaste', name: 'Aftertaste (Hậu vị lưu luyến)', weight: 1, default: 8.0 },
      { id: 'saltAcid', name: 'Salt / Acid Aspect (Cân bằng Muối/Acid)', weight: 1, default: 8.0 },
      { id: 'bitterSweet', name: 'Bitter / Sweet Aspect (Độ ngọt tự nhiên)', weight: 1, default: 8.5 },
      { id: 'mouthfeel', name: 'Mouthfeel / Body (Độ đầm đậm đà)', weight: 1, default: 8.5 },
      { id: 'balance', name: 'Balance (Độ hài hòa cấu trúc)', weight: 1, default: 8.0 },
      { id: 'cleanCup', name: 'Clean Cup (Độ sạch trong tách)', weight: 1, default: 10.0 },
      { id: 'uniformity', name: 'Uniformity (Độ đồng nhất 5 tách)', weight: 1, default: 10.0 },
      { id: 'overall', name: 'Overall (Điểm đánh giá cá nhân)', weight: 1, default: 8.25 }
    ],
    calculate: (scores, defects = { cat1: 0, cat2: 0 }) => {
      const sumScores = Object.values(scores).reduce((a, b) => a + Number(b), 0);
      const defectPenalty = (defects.cat1 * 4) + (defects.cat2 * 2);
      const totalScore = Number((sumScores - defectPenalty).toFixed(2));

      let grade = 'Thương phẩm Tiêu chuẩn (Commercial Grade)';
      let gradeColor = '#94a3b8';
      let marketStatus = 'Bán theo giá sàn ICE London hàng xô loại 2';

      if (totalScore >= 85.0 && defects.cat1 === 0) {
        grade = 'Fine Robusta Siêu Hạng (Exemplary Special Grade)';
        gradeColor = '#eab308';
        marketStatus = 'Giá trị cao gấp 2.5 - 3.0 lần giá sàn London, xuất khẩu sang Đức, Nhật Bản, Ý';
      } else if (totalScore >= 80.0 && defects.cat1 === 0) {
        grade = 'Fine Robusta Đặc Sản (Specialty Grade)';
        gradeColor = '#22c55e';
        marketStatus = 'Giá thặng dư (Premium) +40% đến +70% so với giá thị trường tiêu chuẩn';
      } else if (totalScore >= 75.0) {
        grade = 'Robusta Cao Cấp (Premium Grade)';
        gradeColor = '#3b82f6';
        marketStatus = 'Thích hợp dùng cho các quán Specialty Roastery phối trộn Espresso';
      }

      return {
        totalScore,
        defectPenalty,
        grade,
        gradeColor,
        marketStatus,
        isFineRobusta: totalScore >= 80.0 && defects.cat1 === 0
      };
    }
  }
};

// 5. MẪU ĐẶC TẢ HỢP ĐỒNG ĐẦU RA JSON SCHEMA CHO TÍCH HỢP HỆ THỐNG (API CONTRACT)
export const jsonSchemaContractCode = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AgriDSS_StructuredPrescription",
  "description": "Chuẩn hợp đồng dữ liệu đầu ra có cấu trúc từ Hệ Chuyên Gia Hỗ Trợ Quyết Định Nông Nghiệp Tây Nguyên",
  "type": "object",
  "properties": {
    "system_id": {
      "type": "string",
      "enum": ["COFFEE-MASTER", "PEPPER-DOCTOR", "DURIAN-MASTER", "SOIL-MASTER", "BREW-MASTER"]
    },
    "protocol_step": {
      "type": "integer",
      "description": "Số thứ tự bước hiện tại trong quy trình 5 Cửa Sắt (1 đến 5)",
      "minimum": 1,
      "maximum": 5
    },
    "state_lock": {
      "type": "string",
      "enum": ["LOCKED", "AWAITING_CONFIRMATION", "UNLOCKED"]
    },
    "confidence_metric": {
      "type": "object",
      "properties": {
        "percentage": { "type": "number", "minimum": 0, "maximum": 100 },
        "rating": { "type": "string", "enum": ["CAO (>90%)", "TRUNG BÌNH (70-89%)", "THẤP (<70%)"] },
        "scientific_basis": { "type": "string" },
        "vulnerability_check": { "type": "string" }
      },
      "required": ["percentage", "rating", "scientific_basis", "vulnerability_check"]
    },
    "quantitative_prescriptions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "action_name": { "type": "string" },
          "quantitative_value": { "type": "number" },
          "unit": { "type": "string" },
          "target_stage": { "type": "string" },
          "active_ingredient": { "type": "string" },
          "phi_isolation_days": { "type": "integer" }
        },
        "required": ["action_name", "quantitative_value", "unit", "target_stage"]
      }
    },
    "red_team_stress_forecast": {
      "type": "object",
      "properties": {
        "identified_risk": { "type": "string" },
        "consequence_if_ignored": { "type": "string" },
        "fail_safe_countermeasure": { "type": "string" }
      },
      "required": ["identified_risk", "consequence_if_ignored", "fail_safe_countermeasure"]
    },
    "grounding_citations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "document_standard": { "type": "string" },
          "chapter_clause": { "type": "string" },
          "verbatim_quote": { "type": "string" }
        },
        "required": ["document_standard", "chapter_clause"]
      }
    }
  },
  "required": [
    "system_id",
    "protocol_step",
    "state_lock",
    "confidence_metric",
    "quantitative_prescriptions",
    "red_team_stress_forecast",
    "grounding_citations"
  ]
}`;
