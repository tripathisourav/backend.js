const mouseFollower = document.querySelector('.mouse-follower')


let x = 0, y = 0;

addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e

    // console.log(clientX, clientY);
    

    // mouseFollower.style.position = 'absolute'

    // mouseFollower.style.left = clientX + 'px';
    // mouseFollower.style.top = clientY + 'px';

    x = clientX;
    y = clientY;

})

function far(){
    mouseFollower.style.transform = `translate(${x}px, ${y}px)`;

    // console.log('hello');
    
    requestAnimationFrame(far)  // 1 sec mein 60 frames hote hai ye hr ek frame se pehle ye function execute krega
}

far()
