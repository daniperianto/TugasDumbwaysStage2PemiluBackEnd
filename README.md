# How To Use Pemilu Backend Using Postman

How to use authorization
1. Click tab authorization on postman
2. Choose Type "Bearer Token" on the left
3. Insert token on the right


A. User

1. Register User
  url       : http://localhost:5000/api/v1/user/register
  method    : post
  json body example :
        {
            "fullname" : "Slamet Wilujeng",
            "address" : "Desa Kokoyashi no 3 Pulau Cocoon",
            "sex" : "Laki-Laki",
            "username" : "Eslamet",
            "password" : "akusukapisang"
        }

2. Login
  url       : http://localhost:5000/api/v1/user/login
  method    : post
  json body example :
        {
            "username" : "Eslamet",
            "password" : "akusukapisang"
        }
  note: you will received token which is used to authorization


B. Blog

1. Getting all blogs (no authorization)
  url       : http://localhost:5000/api/v1/blogs
  method    : get
  
2. Getting a blog (no authorization)
  url       : http://localhost:5000/api/v1/blogs/{{blog id}}
  method    : get

3. Create a blog (required authorizaton)
  url       : http://localhost:5000/api/v1/blogs/add
  method    : post
  form-data body example :
    title(type: text)       = Semuanya akan indah pada waktunya
    description(type: text) = sudah lupakan saja semua cerita, dan aku siikapku dan kamu siikapmu
    image(type: file)       = {{insert file image}}

4. Update a blog (required authorizaton)
  url       : http://localhost:5000/api/v1/blogs/{{blog id}}
  method    : patch
  form-data body example :
    title(type: text)       = Semuanya akan indah pada waktunya. bisa jadi
    description(type: text) = sudah lupakan saja semua cerita, dan aku siikapku dan kamu siikapmu. iyaa iyaa
    image(type: file)       = {{insert file image}}

5. Delete a blog (required authorization)
  url       : http://localhost:5000/api/v1/blogs/{{blog id}}
  method    : delete


C. Voter

1. Getting all vote (required authorization)
  url       : http://localhost:5000/api/v1/voters/findall
  method    : get

2. Voting (required authorization)
  url       : http://localhost:5000/api/v1/voters/vote
  method    : post
  json body example :
        {
            "paslonNumber" : 1
        }


D. Paslon

1. Getting all paslon (no authorization)
  url       : http://localhost:5000/api/v1/paslons
  method    : get
  
2. Getting a paslon (no authorization)
  url       : http://localhost:5000/api/v1/paslons/{{paslon id}}
  method    : get

3. Create a paslon (required authorizaton)
  url       : http://localhost:5000/api/v1/paslons/add
  method    : post
  form-data body example :
    name(type: text)          = Slamet Wilujeng
    visionMission(type: text) = Menghilangkan pinjol dari dumbways
    image(type: file)       = {{insert file image}}

4. Update a paslon (required authorizaton)
  url       : http://localhost:5000/api/v1/paslons/{{paslon id}}
  method    : patch
  form-data body example :
    name(type: text)          = New Neo Slamet Wilujeng
    visionMission(type: text) = Menghilangkan pinjol dari dumbways dan ****
    image(type: file)         = {{insert file image}}

5. Delete a paslon (required authorization)
  url       : http://localhost:5000/api/v1/paslons/{{paslon id}}
  method    : delete

E. Partai

1. Getting all partais (no authorization)
  url       : http://localhost:5000/api/v1/partais
  method    : get
  
2. Getting a partai (no authorization)
  url       : http://localhost:5000/api/v1/partais/{{partai id}}
  method    : get

3. Create a partai (required authorizaton)
  url       : http://localhost:5000/api/v1/partais/add
  method    : post
  form-data body example :
    name(type: text)          = PBS
    leader(type: text)        = Slamet Wilujen
    visionMission(type: text) = Menghijaukan bumi
    address(type: text)       = Hutan Jaya
    image(type: file)         = {{insert file image}}
    paslonId(type: text)      = {{paslon id}}

4. Update a partai (required authorizaton)
  url       : http://localhost:5000/api/v1/partais/{{paslon id}}
  method    : patch
  form-data body example :
    name(type: text)          = PBS
    leader(type: text)        = Slamet Wilujen
    visionMission(type: text) = Menghijaukan bumi
    address(type: text)       = Hutan Jaya
    image(type: file)         = {{insert file image}}
    paslonId(type: text)      = {{paslon id}}

5. Delete a partai (required authorization)
  url       : http://localhost:5000/api/v1/partais/{{paslon id}}
  method    : delete


