<?php 
$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["email"] = $session['email'];
    $response["name"] = $session['name'];
    echoResponse(200, $session);
});


$app->post('/login', function() use ($app) {
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'),$r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->customer->password;
    $email = $r->customer->email;
    $user = $db->getOneRecord("select uid,name,password,email,created from users where phone='$email' or email='$email'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Logged in successfully.';
        $response['name'] = $user['name'];
        $response['uid'] = $user['uid'];
        $response['email'] = $user['email'];
        $response['createdAt'] = $user['created'];
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['uid'] = $user['uid'];
        $_SESSION['email'] = $email;
        $_SESSION['name'] = $user['name'];
        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'No such user is registered';
        }
    echoResponse(200, $response);
});
$app->post('/signUp', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'name', 'password'),$r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $phone = $r->customer->phone;
    $name = $r->customer->name;
    $email = $r->customer->email;
    $title = $r->customer->title;
    $password = $r->customer->password;
    $role=$r->customer->role;
    $group_id=$r->customer->group_id;
    $r->customer->profile_image=$r->profile_image;

    $r->customer->last_login=date('Y-m-d H:i:s');
    $isUserExists = $db->getOneRecord("select 1 from users where phone='$phone' or email='$email'");
    if(!$isUserExists){
        $r->customer->password = passwordHash::hash($password);
        $tabble_name = "users";
        $column_names = array('phone', 'name', 'email', 'password', 'title','last_login','role','group_id','profile_image');
        $result = $db->insertIntoTable($r->customer, $column_names, $tabble_name);
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "User account created successfully";
            $response["uid"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["uid"];
            $_SESSION['phone'] = $phone;
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create customer. Please try again";
            echoResponse(201, $response);
        }            
    }else{
        $response["status"] = "error";
        $response["message"] = "An user with the provided phone or email exists!";
        echoResponse(201, $response);
    }
});
$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

$app->post('/deleteUser', function() use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $response = array();
    $sql="DELETE FROM users WHERE uid=".$r->uid;
    $kq=$db->excuteQuery($sql);
    if($kq)
    {
        $response["status"] = "success";
        $response["message"] = "Deleted successfully";
    }else{
         $response["status"] = "error";
          $response["message"] = "Failed to delete user. Please try again";
    }
    
    echoResponse(200, $response);
});
// Recent activity 
$app->get('/recent', function() {
    $db = new DbHandler();
    $response=$db->getQuery("SELECT * FROM feedbacks ORDER BY id desc");
    //$response=array(array('title'=>"postt 001"),array('title'=>"post 02"));
    //$response=array('title'=>"postt 001",'title'=>"post 02");["title"] = "info";
    //$response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

$app->get('/summary', function() {
    $db = new DbHandler();
    $anonymous=$db->getNumRows("SELECT * FROM feedbacks where type=1");
    $response['anonymous']=$anonymous;
    $deparment=$db->getNumRows("SELECT * FROM feedbacks where type=2");
    $response['deparment']=$deparment;
    $agency=$db->getNumRows("SELECT * FROM feedbacks where type=3");
    $response['agency']=$agency;
    $comments=$db->getNumRows("SELECT * FROM fbcomment");
    $response['comments']=$comments;
    echoResponse(200, $response);
});

$app->get('/lastfeedback', function() {
     $db = new DbHandler();
     $department=$db->getQuery("SELECT * FROM feedbacks where type=2 and is_approve=1 order by id desc LIMIT 3");
     $agency=$db->getQuery("SELECT * FROM feedbacks where type=3 and is_approve=1 order by id desc LIMIT 3");
     $response['department']=$department;
     $response['agency']=$agency;
     echoResponse(200, $response);
});

$app->get('/getCategories', function() {
    $db = new DbHandler();
    $categories=$db->getQuery("SELECT * FROM categories where type > 0 ");
    $department=array();
    $agency=array();
    if(count($categories)){
        foreach ($categories as $key => $cat) {
            if($cat['type']==2)
            {
                $department[]=$cat;
            }else{
                $agency[]=$cat;
            }
        }
    }
    $response['department']=$department;
    $response['agency']=$agency;
    echoResponse(200, $response);
});

$app->get('/totalFB', function() {
    $db = new DbHandler();
    $total_rows=$db->getNumRows("SELECT * FROM feedbacks WHERE is_approve=1");
    echoResponse(200, $total_rows);
});

$app->post('/getFB', function() use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $currentPage=$r->currentPage;
    $itemsPerPage=$r->itemsPerPage;
    $start=$currentPage* $itemsPerPage;
    $filter="";
    
    if(isset($r->department_id) &&  $r->department_id >= 0)
    {
        $filter .=" and cat_id=".$r->department_id;
    }

    if(isset($r->agency_id) &&  $r->agency_id >= 0)
    {
        $filter .=" and cat_id=".$r->agency_id;
    }

    if(isset($r->catID) &&  $r->catID >= 0)
    {
        $filter .=" and cat_id=".$r->catID;
    }

     if(isset($r->keyword) &&  !empty($r->keyword))
    {
        $filter .=" and subject like '%".$r->keyword."%'";
    }

    $total_rows=$db->getNumRows("SELECT * FROM feedbacks WHERE is_approve=1 ".$filter);
    $fbs=$db->getQuery("SELECT * FROM feedbacks WHERE is_approve=1 ".$filter." LIMIT ". $start.",". $itemsPerPage);
    $response['totalRows']=$total_rows;
    $response['pagedItems']=$fbs;
    echoResponse(200,$response);
});



$app->post('/getFBDetail', function() use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $fbid=$r->fbid;
  
    $fbs=$db->getOneRecord("select fb.*,u.name as username,c.name as category from feedbacks as fb 
left join users as u on fb.usr_approve=u.uid
left join categories as c on fb.cat_id=c.id WHERE fb.id=".$fbid);
    echoResponse(200,$fbs);
});

$app->post('/getFBComments', function() use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $fbid=$r->fbid;
    $search="";
    if(isset($r->is_approve))
    {
        $search=" and is_approve=".$r->is_approve;
    }
    
    $fbs=$db->getQuery("select fbc.*,c.name as username from fbcomment as fbc left join users as c on fbc.usr_approve = c.uid
     WHERE fbc.fid=".$fbid." ".$search);
    echoResponse(200,$fbs);
});
$app->post('/updateFB', function() use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $fbid=$r->fbid;
    $is_approve=$r->is_approve;
    $allow_comment=$r->allow_comment;
    $usr_approve=$r->usr_approve;
    $datetime=date("Y-m-d h:i:s");

    $sql="UPDATE feedbacks set is_approve='".$is_approve."', allow_comment='".$allow_comment."', usr_approve='".$usr_approve."', approve_date='".$datetime."'
    WHERE id=".$fbid;
    $kq=$db->excuteQuery($sql);
    $response["status"] = "success";
    $response["message"] = "Update feedback successfully";
    echoResponse(200, $response);
});

$app->post('/postComment', function() use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
   
    $r->formData->create_date=date("Y-m-d h:i:s");
    $r->formData->approve_date=date("Y-m-d h:i:s");
    $tabble_name="fbcomment";
    
    $column_names=array('fid','name','comment','create_date','is_approve','usr_approve','approve_date');
    $require_fieds=array('fid', 'name','comment');

    verifyRequiredParams($require_fieds,$r->formData);

     $result = $db->insertIntoTable($r->formData, $column_names, $tabble_name);
   

    if ($result != NULL) {

            $r->formData->id=$result;
            $response["fbobject"] =  $r->formData;
            $response["status"] = "success";
            $response["message"] = "Your comment created successfully";
          
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create comment. Please try again";
            echoResponse(201, $response);
    }
});

$app->post('/getUsers', function() use ($app){
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $currentPage=$r->currentPage;
    $itemsPerPage=$r->itemsPerPage;
    $start=$currentPage* $itemsPerPage;
    $filter="";
    $order_by=" order by name asc";
    $total_rows=$db->getNumRows("SELECT * FROM users WHERE 1=1 ".$filter);
    $fbs=$db->getQuery("SELECT * FROM users WHERE 1=1 ".$filter. $order_by." LIMIT ". $start.",". $itemsPerPage);
    $response['totalRows']=$total_rows;
    $response['pagedItems']=$fbs;
    echoResponse(200,$response);
});

$app->post('/getALLFB', function() use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $currentPage=$r->currentPage;
    $itemsPerPage=$r->itemsPerPage;
    $start=$currentPage* $itemsPerPage;
    $filter="";
    
    if(isset($r->department_id) &&  $r->department_id >= 0)
    {
        $filter .=" and cat_id=".$r->department_id;
    }

    if(isset($r->agency_id) &&  $r->agency_id >= 0)
    {
        $filter .=" and cat_id=".$r->agency_id;
    }

    if(isset($r->catID) &&  $r->catID >= 0)
    {
        $filter .=" and cat_id=".$r->catID;
    }

     if(isset($r->keyword) &&  !empty($r->keyword))
    {
        $filter .=" and subject like '%".$r->keyword."%'";
    }

    $total_rows=$db->getNumRows("SELECT * FROM feedbacks WHERE 1=1 ".$filter);
    $fbs=$db->getQuery("SELECT * FROM feedbacks WHERE 1=1 ".$filter." LIMIT ". $start.",". $itemsPerPage);
    $response['totalRows']=$total_rows;
    $response['pagedItems']=$fbs;
    echoResponse(200,$response);
});

$app->post('/getSetting', function() use ($app) {
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
    $setting=$db->getOneRecord("SELECT * FROM settings where meta_key='".$r->meta_key."'");
    $response['meta_value']=$setting;
    echoResponse(200, $setting);
});

$app->post('/removeFile', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    //$destination = '../../attachs/' . $r->fileName;
   
    $destination= dirname(dirname(dirname( __FILE__ ))).'\attachs/'.$r->fileName;
     unlink($destination);
});

$app->post('/usrLikeDislike', function() use ($app) {
    $response = array();
    $db = new DbHandler();
    $r = json_decode($app->request->getBody());
   
    if($r->task == 'like')
    {
        $kq=$db->excuteQuery("UPDATE feedbacks set usr_like=usr_like+1 WHERE id=".$r->item->id);
    }else if($r->task=='dislike'){
        $kq=$db->excuteQuery("UPDATE feedbacks set usr_dislike=usr_dislike+1 WHERE id=".$r->item->id);
    }
    if($kq)
    {
        $response["status"] = "success";
        $response["message"] = "Your vote feedback successfully";
    }else{
        $response["status"] = "error";
        $response["message"] = "Failed to vote feedback.";
    } 
    echoResponse(201, $response);    
    
});

$app->post('/submitAnonymous', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    
    $tabble_name="feedbacks";
    $column_names=array('subject','content','attach','create_date','is_public','allow_comment','type');
    $require_fieds=array('subject', 'content');
  
    if($r->formData->type==2)
    {
        $require_fieds[]="name";
        $require_fieds[]="cat_id";

        $column_names[]="name";
        $column_names[]="cat_id";
    }
    if($r->formData->type==3)
    {
        $require_fieds[]="name";
        $require_fieds[]="cat_id";

        $column_names[]="name";
        $column_names[]="cat_id";
    }

    verifyRequiredParams($require_fieds,$r->formData);

    $db = new DbHandler();
    if(!isset($r->formData->attach))
    {

        $r->formData->attach=array();
    }
    if(!isset($r->formData->is_public))
    {
        $r->formData->is_public=0;
    }
    if(!isset($r->formData->allow_comment))
    {
        $r->formData->allow_comment=0;
    }else if($r->formData->allow_comment){
        $r->formData->allow_comment=1;
    }else{
        $r->formData->allow_comment=0;
    }
    $r->formData->create_date=date('Y-m-d h:i:s');

    $r->formData->attach=serialize($r->formData->attach);
    
    
    $result = $db->insertIntoTable($r->formData, $column_names, $tabble_name);

    if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "Your feedback created successfully";
          
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create feedback. Please try again";
            echoResponse(201, $response);
    }
    
});
?>