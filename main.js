document.getElementById('myForm').addEventListener('submit',saveBookmark);
function saveBookmark(e){
  var sitename=document.getElementById("SiteName").value;
  var siteurl=document.getElementById("SiteUrl").value;


if(!formValidate(sitename,siteurl))
{

  return false;
}
  var bookmark={
    name:sitename,
    url:siteurl
  }

if(localStorage.getItem("bookmarks")=== null)
{
  var bookmarks=[];
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
else{
  var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
document.getElementById('myForm').reset();
//prevent form from submittinng
fetchResult();
e.preventDefault();

}

function deleteBookmark(url){
  var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
  for(var i=0;i<bookmarks.length;i++)
  {
    if(bookmarks[i].url==url)
    {
      bookmarks.splice(i,1);
    }
  }
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

  fetchResult();
}

function fetchResult(){
  var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
  var bookmarkResult=document.getElementById('bookmarkResult');
  bookmarkResult.innerHTML='';
  for(var i=0;i<bookmarks.length;i++)
  {
    var name=bookmarks[i].name;
    var url=bookmarks[i].url;
    bookmarkResult.innerHTML+='<h3>'+ name+' '+
                      '<a class="btn btn-primary" target="_blank" href = "'+url+'" >visit</a>'
                      + ' '+'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href = "#" >Remove</a>'
                      + '</h3>' ;
  }
}

function formValidate(sitename,siteurl){
  if(!siteurl || !sitename)
  {
    alert('Please fill the details');
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteurl.match(regex))
  {
    alert('not a valid url');
    return false;
  }

  return true;
}
