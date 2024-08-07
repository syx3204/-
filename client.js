document.addEventListener('DOMContentLoaded', function() {
    // 加载留言
    function loadComments() {
        const commentsContainer = document.getElementById('message-list');
        const comments = localStorage.getItem('comments');
        if (comments) {
            const parsedComments = JSON.parse(comments);
            commentsContainer.innerHTML = ''; // 清空现有的留言
            parsedComments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.innerHTML = `
                    <p><strong>${comment.name}</strong></p>
                    <p>${comment.message}</p>
                `;
                commentsContainer.appendChild(commentElement);
            });
        }
    }

    // 添加表单提交事件处理程序
    document.getElementById('message-form').addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单默认提交行为
        // 获取表单值
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;

        const comments = localStorage.getItem('comments');
        let commentList = comments ? JSON.parse(comments) : [];
        commentList.push({ name: name, message: message });

        localStorage.setItem('comments', JSON.stringify(commentList));

        // 清空表单
        document.getElementById('name').value = '';
        document.getElementById('message').value = '';

        // 显示提交成功消息
        document.getElementById('success-message').style.display = 'block';

        // 加载留言
        loadComments();
    });

    // 加载留言
    loadComments();
});
