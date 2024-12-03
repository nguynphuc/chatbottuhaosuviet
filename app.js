$(function(){
    var inputVal;
    let API_Key = "#";
    
    // Biến đếm số lần lỗi
    let errorCount = 0;

    function renderMesGPT(incoming){
        let API_URL = "https://api.openai.com/v1";
        let chatbox  = document.querySelector(".chatbox");
        let contentBot = incoming.querySelector(".loading");
        const option = {
            method: "POST",
            headers: {
                Accept: "application.json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_Key}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": inputVal}]
            })
        }
        fetch(API_URL, option).then(res => res.json()).then(data => {
            contentBot.innerHTML = data.choices[0].message.content;
        }).catch((error) => {
            // Mảng các thông báo lỗi
            const errorMessages = [
            "Vậy bây giờ tiếp, theo bạn hãy cho tôi biết một vài điểm yếu của bạn liên quan đến môn học lịch sử này từ đó tôi có thể đưa ra cho bạn một giải pháp cụ thể và phù\nhợp. (Ví dụ: bạn không có khả năng ghi nhớ tốt, bạn cảm thấy môn lịch sử khá nhàm chán hoặc không thể tập trung vào lịch sử quá lâu,.. ).",
            "Tiếp theo, bạn hãy cho tôi biết những cơ hội, lợi thế xung quanh bạn mà có thể giúp bạn học tốt môn lịch sử hơn. (Ví dụ: bạn có thể truy cập được nhiều nguồn cung cấp các kiến thức lịch sử thú vị hoặc là gần khu vực bạn sinh sống có nhiều bảo tàng lịch sử, địa chỉ đỏ,...). ",
            "Cuối cùng bạn hãy cho tôi biết những khó khăn, thách thức mà bạn gặp phải trong quá trình tìm hiểu và học hỏi môn lịch sử. (Ví dụ: Bạn thường bị tiếp xúc với các nguồn thông tin không chính xác, sai lệch hay xuyên tạc lịch sử, có tính phản động, hay bị áp lực bởi điểm số nên thành ra bạn cảm thấy chán khi học,...).  ",
            "Vậy thì sau đây sẽ là giải pháp tôi cung cấp cho bạn dựa vào biểu đồ SWOT:\nĐIỂM MẠNH: Với điểm mạnh là biết sử dụng tiếng Anh thì bạn có thể sử dụng các nguồn tư liệu được viết bằng tiếng Anh trên các trang web hoặc trang mạng xã hội, từ đó bạn có thể biết thêm về lịch sử ở các khu vực khác nhau và giúp mình hình thành cái khách quan và toàn diện hơn về các sự kiện lịch sử.\n\nĐIỂM YẾU: Với việc bạn có khả năng ghi nhớ yếu thì điều đầu tiên bạn cần làm là hệ thống trước các kiến thức cần học, tiếp theo là bạn học những nội dung cốt lõi của sự kiện để có thể nhớ được nó lâu hơn mà không cần phải học quá nhiều.\n\nCƠ HỘI: Với cơ hội là bạn có thể truy cập đến nhiều trang mạng xã hội như Tiktok, Youtube thì bạn nên theo dõi những kênh nội dung về lịch sử và thường xuyên xem những video trên đó để học hỏi thêm những kiến thức mới lạ không có trong sách vở và các bạn sẽ được học những kiến thức đó theo một cách mới mẻ và vui nhộn do các kênh này truyền tải.\n\nTHÁCH THỨC: với việc bạn đã thường xuyên tiếp xúc với các kiến thức sai lệch, bị xuyên tạc do nó tràn lan trên mạng xã hội thì điều đầu tiên là bạn cần phải lọc ra những nguồn thông tin nào không chuẩn xác và không theo dõi nó nữa, tiếp theo bạn nên tìm những nguồn tin chính thống để tránh mắc phải sai lầm đã gặp.",
            "Bạn hãy cho tôi biết một số điểm mạnh của bạn liên quan về môn Lịch Sử để từ đó tôi có thể tìm được một phương pháp riêng cho mình để có thể học tốt môn lịch sử.  (Ví dụ điểm mạnh: bạn giỏi một ngôn ngữ khác nào đó chẳng hạn như tiếng anh,..., hoặc là bạn là một người có khả năng tư duy tốt, ghi nhớ tốt,.. )",
            "Vậy bây giờ tiếp, theo bạn hãy cho tôi biết một vài điểm yếu của bạn liên quan đến môn học lịch sử này từ đó tôi có thể đưa ra cho bạn một giải pháp cụ thể và phù\nhợp. (Ví dụ: bạn không có khả năng ghi nhớ tốt, bạn cảm thấy môn lịch sử khá nhàm chán hoặc không thể tập trung vào lịch sử quá lâu,.. ).",
            "Tiếp theo, bạn hãy cho tôi biết những cơ hội, lợi thế xung quanh bạn mà có thể giúp bạn học tốt môn lịch sử hơn. (Ví dụ: bạn có thể truy cập được nhiều nguồn cung cấp các kiến thức lịch sử thú vị hoặc là gần khu vực bạn sinh sống có nhiều bảo tàng lịch sử, địa chỉ đỏ,...). ",
            "Cuối cùng bạn hãy cho tôi biết những khó khăn, thách thức mà bạn gặp phải trong quá trình tìm hiểu và học hỏi môn lịch sử. (Ví dụ: Bạn thường bị tiếp xúc với các nguồn thông tin không chính xác, sai lệch hay xuyên tạc lịch sử, có tính phản động, hay bị áp lực bởi điểm số nên thành ra bạn cảm thấy chán khi học,...).  ",
            "Vậy thì sau đây sẽ là giải pháp tôi cung cấp cho bạn dựa vào biểu đồ SWOT: ĐIỂM MẠNH: Với điểm mạnh là khả năng ghi nhớ tốt, bạn sẽ có thể hệ thống kiến cần học sau đó ghi nhớ và mở rộng thêm từ những kiến thức đó, đồng thời sẽ rèn luyện cho bạn kĩ năng phân phân tích, đánh giá kiến thức đã học. ĐIỂM YẾU: Với điểm yếu là không cảm thấy hứng thú hay sự yêu thích đối với môn lịch sử trong quá trình học thì bạn không cần đặt nặng tâm lí bản thân khi học, bạn cần giữ trạng thái thoải mái, vui tươi nhất có thể. Bên cạnh đó bạn có thể ìm hiểu về các kiến thức thú vị trong lịch sử để tạo sự hứng thú cho quá trình học của mình. CƠ HỘI: Có nhiều địa chỉ đỏ, di tích lịch sử, bảo tàng,... gần khu vực bạn sống sẽ là một cơ hội rất tốt để bạn có thể đến tham quan học tập tại các địa điểm này. Vì điều đó sẽ tạo thêm hứng thú cho bạn, giúp bạn cảm nhận được việc học tập và trải nghiệm thực tế các sự kiện, nhân vật lịch sử nổi tiếng. THÁCH THỨC: Nếu bạn đang có quá nhiều thông tin cần phải tìm hiểu để học, khiến bạn dễ thấy hoang mang và chán nản thì trước khi bắt đầu học, hãy hệ thống các kiến thức mà bạn cần tìm hiểu để tránh lan man trong quá trình học"
            ];
            
            // Xác định thông báo cần hiển thị
            let messageToShow;

            // Nếu lỗi lần thứ 6 trở đi, hiển thị thông báo của lần thứ 5
            if (errorCount < 9) {
                messageToShow = errorMessages[errorCount];
            } else {
                messageToShow = errorMessages[8];  // Lần thứ 5 và các lần sau cùng thông báo này
            }

            // Cập nhật biến đếm số lần lỗi
            errorCount++;

            // Hiển thị thông báo lỗi
            contentBot.innerHTML = messageToShow;
        }).finally(() => {
            chatbox.scrollTo(0, chatbox.scrollHeight);
        });
    }

    function createMessage(message, className){
        let chatbox  = document.querySelector(".chatbox");
        const chatLi = document.createElement("div");
        chatLi.classList.add("chat", className);
        let contentUser = className === "outcoming" ? `<p class="text"></p>` : `<div class="icon-robot"><i class="fa-solid fa-robot"></i></div><div class='loading'><div class="box-loader"><div class="circle circle1"></div><div class="circle circle2"></div><div class="circle circle3"></div></div></div><p></p>`;
        chatLi.innerHTML = contentUser;
        chatLi.querySelector("p").innerText = message;
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return chatLi;
    }

    $(".send").on("click", function(){
        inputVal = $(".message input").val().trim();
        if(!inputVal) return;
        $(".message input").val("");
        let chatbox  = document.querySelector(".chatbox");
        $(".chatbox").append(createMessage(inputVal, "outcoming"));
        setTimeout(() => {
            let incomingText = createMessage("", "incoming");
            $('.chatbox').append(incomingText);
            renderMesGPT(incomingText);
        }, 500);
        chatbox.scrollTo(0, chatbox.scrollHeight);
    });

    $("button[type='button']").on("click", function(){
        $('.boxchatbot').fadeIn("slow");
        $('.home').fadeOut("slow");
    });

    $(".fa-xmark").on("click", function(){
        $('.boxchatbot').fadeOut("slow");
        $('.home').fadeIn("slow");
    });

    gsap.from(".home",{
        duration: 4,
        opacity: 0,
        ease: "power4.easeOut",
    });
});
