Using Category and Work APIs


1. CATEGORY APIs
	"http://@localhost:3001"

C	(POST) "/"
	INPUT -> title (in req.body)
	OUTPUT -> redirect "/:categoryId"

R	(GET) "/" 
	OUTPUT -> gives all categories.

U	(POST) "/:categoryId/update"
	INPUT -> categoryId (req.params),
		 title (req.body)
	OUTPUT -> redirect "/:categoryId"

D	(POST) "/:categoryId"
	INPUT -> categoryId (req.params)
	OUTPUT -> redirect "/"

EXTRA: 
Read	(GET) "/:categoryId"
	INPUT -> categoryId (req.params)
	OUTPUT -> gives category data
--------------------------------------------------------------
2. WORK APIs
	"http://@localhost:3000/:categoryId/works"

C	(POST) "/"
	INPUT -> title, description (req.body),
		 categoryId (req.params)
	OUTPUT -> redirect "/:workId"

R	(GET) "/" 
	INPUT: categoryId (req.params)
	OUTPUT -> gives all works from categories.

U	(POST) "/:workId/update"
	INPUT -> categoryId,workId (req.params),
		 title,description (req.body)
	OUTPUT -> redirect "/:workId"

D	(POST) "/:workId"
	INPUT -> categoryId, workId (req.params)
	OUTPUT -> redirect "/"

EXTRA: 
Read	(GET) "/:workId"
	INPUT -> workId (req.params)
	OUTPUT -> gives work data
----------------------------------------------------------
