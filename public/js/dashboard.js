var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})

try {
  const postHandler = async (event) => {
      event.preventDefault();    
      const title = $('#post-title').val().trim();
      const contents = $('#post-body').val().trim();
      if(title && contents) {
        const user_id = event.target.getAttribute('data-id');
          const response = await fetch(`/api/dashboard/${user_id}`, {
              method: 'POST',
              body: JSON.stringify({ title, contents }),
              headers: { 'Content-Type': 'application/json '},
          });
            await response.json();
  
        
          if (response.ok) {
              alert('Post Added')
              document.location.replace(`/api/dashboard/${user_id}`);     
          } else {
              alert('You Are Not Logged In!');
          }
      }
  }
  $('#add-post').on('click', postHandler);
  } catch (error) {
      console.log(error)
  }

  

  