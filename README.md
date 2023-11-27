# How To Use Pemilu Backend Using Postman

How to use authorization
1. Click tab authorization on postman
2. Choose Type "Bearer Token" on the left
3. Insert token on the right


#### A. User

1. Register User<br>
* Url : http://localhost:5000/api/v1/user/register
* Method : `POST`
* Json body example :

        {
            "fullname" : "Slamet Wilujeng",
            "address" : "Desa Kokoyashi no 3 Pulau Cocoon",
            "sex" : "Laki-Laki",
            "username" : "Eslamet",
            "password" : "akusukapisang"
        }

2. Login<br>
* Url       : http://localhost:5000/api/v1/user/login
* Method    : `POST`
* Json body example :

        {
            "username" : "Eslamet",
            "password" : "akusukapisang"
        }

note: you will received token which is used to authorization<br>


#### B. Blog

1. Getting all blogs (no authorization)<br>
* Url       : http://localhost:5000/api/v1/blogs
* Method    : `GET`
  
2. Getting a blog (no authorization)<br>
* Url       : http://localhost:5000/api/v1/blogs/{blog-id}
* Method    : `GET`

3. Create a blog (required authorizaton)
* Url       : http://localhost:5000/api/v1/blogs/add
* Method    : `GET`
* Form-data body example :
```
    title       = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    description = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    image       = miku.png
```

4. Update a blog (required authorizaton)<br>  
* Url       : http://localhost:5000/api/v1/blogs/{blog-id}
* Method    : `PATCH`
* Form-data body example :
```
    title       = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    description = Paslon *** Tertangkap Kamera Sedang Membeli Body Pillow Bergambar Miku
    image       = miku.png
```

5. Delete a blog (required authorization)<br>
* Url       : http://localhost:5000/api/v1/blogs/{blog-id}
* Method    : `DELETE`


#### C. Voter

1. Getting all vote (required authorization)<br>
* Url       : http://localhost:5000/api/v1/voters/findall
* Method    : `GET`

2. Voting (required authorization)<br>
* Url       : http://localhost:5000/api/v1/voters/vote<br>
* Method    : `POST`
* Json body example :

        {
            "paslonNumber" : 1
        }


#### D. Paslon

1. Getting all paslon (no authorization)<br>
* Url       : http://localhost:5000/api/v1/paslons
* Method    : `GET`
  
2. Getting a paslon (no authorization)<br>
* Url       : http://localhost:5000/api/v1/paslons/{paslon-id}
* Method    : `GET`

3. Create a paslon (required authorizaton)
* Url       : http://localhost:5000/api/v1/paslons/add
* Method    : `POST`
* Form-data body example :
````
    name          = Slamet Wilujeng
    visionMission = Menghilangkan pinjol dari dumbways
    image         = slamet.png
````
4. Update a paslon (required authorizaton)
* Url       : http://localhost:5000/api/v1/paslons/{paslon-id}
* Method    : patch
* Form-data body example :
```
    name          = New Neo Slamet Wilujeng
    visionMission = Menghilangkan pinjol dari dumbways dan ****
    image         = slamet.png
```
5. Delete a paslon (required authorization)<br>
* Url       : http://localhost:5000/api/v1/paslons/{paslon-id}
* Method    : `DELETE`

#### E. Partai

1. Getting all partais (no authorization)<br>
* Url       : http://localhost:5000/api/v1/partais
* Method    : `GET`
  
2. Getting a partai (no authorization)<br>
* Url       : http://localhost:5000/api/v1/partais/{partai-id}
* Method    : `GET`

3. Create a partai (required authorizaton)
* Url       : http://localhost:5000/api/v1/partais/add
* Method    : `POST`
* Form-data body example :
```
    name          = PBG
    leader        = Slamet Wilujeng
    visionMission = Menghijaukan bumi
    address       = Hutan Jaya
    image         = slamet.png
    paslonId      = 1
```
4. Update a partai (required authorizaton)
* Url       : http://localhost:5000/api/v1/partais/{{paslon-id}}
* Method    : `PATCH`
* Form-data body example :
```
    name          = PBG
    leader        = Slamet Wilujeng
    visionMission = Menghijaukan bumi
    address       = Hutan Jaya
    image         = slamet.png
    paslonId      = 1
```
5. Delete a partai (required authorization)<br>
* Url       : http://localhost:5000/api/v1/partais/{{paslon-id}}
* Method    : `DELETE`


