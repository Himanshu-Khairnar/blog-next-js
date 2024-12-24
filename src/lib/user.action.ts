'use server'
export const getBlogs = async () => {
    try{
        const res = await fetch("http://localhost:3000/api/writepost", {
            cache: "no-store",
          });
      
          if (!res.ok) {
            throw new Error("Failed to fetch topics");
          }
          const data = await res.json();
          return data.data
        }catch(error){
        console.log(error)
    }
}

export const putdata=async(data:{title:string,image:string,description:string,type:string,author:string,authorImg:string})=>{
  try {
    const response = await fetch("http://localhost:3000/api/writepost", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
    } else {
      console.error("Failed to upload:", response.statusText);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

export const deleteData=async (id:string)=>{
  try {
    const response = await fetch(`http://localhost:3000/api/writepost?id=${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const result = await response.json();
    } else {
      console.error("Failed to upload:", response.statusText);
    }
  } catch (error) { 
    console.error("Failed to fetch topics:", error);
    }
}

export const UpdateData = async(id:string,data:{newtitle:string,newimage:string,newdescription:string,newtype:string,newauthor:string,newauthorImg:string})=>
{
  try
  {
    const response = await fetch(`http://localhost:3000/api/update/${id}`,{
      method:'PUT',
      body:JSON.stringify(data)
    })
    if(response.status===200){
      return true
    }
    else{
      return false
    }
  }
  catch(error){
    console.error(error)
  }
}