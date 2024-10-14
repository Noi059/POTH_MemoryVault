document.addEventListener("DOMContentLoaded", function() {
    const image = document.querySelector('.bouncing-image');
    let posX = 0;
    let posY = 0;
    let velocityX = 2;  // X축 속도
    let velocityY = 2;  // Y축 속도
    const imageWidth = image.clientWidth;
    const imageHeight = image.clientHeight;

    function moveImage() {
        // 화면의 크기 가져오기
        const windowWidth = window.innerWidth;
        const windowHeight = window.screen.height;

        // X축 위치 업데이트
        posX += velocityX;
        if (posX + imageWidth > windowWidth || posX < 0) {
            velocityX *= -1; // 벽에 닿으면 방향을 반대로
        }

        // Y축 위치 업데이트
        posY += velocityY;
        if (posY + imageHeight > windowHeight || posY < 0) {
            velocityY *= -1; // 벽에 닿으면 방향을 반대로
        }

        // 이미지 위치 설정
        image.style.left = posX + 'px';
        image.style.top = posY + 'px';

        requestAnimationFrame(moveImage); // 애니메이션 프레임 요청
    }

    // 이미지 클릭 이벤트 추가
    image.addEventListener('click', function() {
        image.style.display = 'none'; // 이미지 숨기기
        setTimeout(function() {
            image.style.display = 'block'; // 3초 후에 이미지 다시 표시
        }, 3000);
    });

    moveImage(); // 애니메이션 시작
});

document.addEventListener("DOMContentLoaded", function() {
    const draggables = document.querySelectorAll('.draggable-image');
    const startTop = 50; // 모든 이미지가 시작할 top 위치
    const startLeft = 900; // 첫 번째 이미지가 시작할 left 위치
    const gap = 10; // 이미지 간의 간격

    // 각 이미지를 일렬로 배치
    draggables.forEach((draggable, index) => {
        draggable.style.top = `${startTop}px`;
        draggable.style.left = `${startLeft + index * (draggable.clientWidth + gap)}px`;
    });

    draggables.forEach(draggable => {
        let isDragging = false;
        let offsetX, offsetY;

        // 마우스 다운 이벤트: 드래그 시작 및 클릭 시 커서 변경
        draggable.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - draggable.getBoundingClientRect().left;
            offsetY = e.clientY - draggable.getBoundingClientRect().top;

            // 클릭 시 커서 이미지 변경
            draggable.style.cursor = 'url("pointer_2.png"), grabbing'; // 클릭 중 커서 이미지 설정
        });

        // 마우스 이동 이벤트: 드래그 중
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                draggable.style.left = `${e.clientX - offsetX}px`;
                draggable.style.top = `${e.clientY - offsetY}px`;
            }
        });

        // 마우스 업 이벤트: 드래그 종료 및 클릭 해제 시 커서 복원
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;

                // 클릭 해제 후 커서 이미지 복원
                draggable.style.cursor = 'url("pointer.png"), move'; // 기본 커서 이미지로 되돌림
            }
        });
    });

    // 페이지 전체에서 클릭한 상태에서의 커서 변경
    document.addEventListener('mousedown', function() {
        document.body.style.cursor = 'url("pointer_2.png"), grabbing'; // 클릭 중 커서 이미지 설정
    });

    document.addEventListener('mouseup', function() {
        document.body.style.cursor = 'url("pointer.png"), auto'; // 클릭 해제 시 커서 복원
    });
});