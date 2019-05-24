---
title: wordpress-function
abbrlink: 57516
date: 2019-05-08 14:27:03
tags:
---

wordpress 插件开发总结

<!-- more -->

# 新增分类字段

```
class Ludou_Tax_Image{  
   
    function __construct(){  
          
        // 新建分类页面添加自定义字段输入框  
        add_action( 'category_add_form_fields', array( $this, 'add_tax_image_field' ) );  
        // 编辑分类页面添加自定义字段输入框  
        add_action( 'category_edit_form_fields', array( $this, 'edit_tax_image_field' ) );  
  
        // 保存自定义字段数据  
        add_action( 'edited_category', array( $this, 'save_tax_meta' ), 10, 2 );  
        add_action( 'create_category', array( $this, 'save_tax_meta' ), 10, 2 );  
   
   
    } // __construct  
   
    /** 
     * 新建分类页面添加自定义字段输入框 
     */  
    public function add_tax_image_field(){  
    ?>  
        <div class="form-field">  
            <label for="term_meta[tax_image]">分类封面</label>  
            <input type="text" name="term_meta[tax_image]" id="term_meta[tax_image]" value="" />  
            <p class="description">输入分类封面图片URL</p>  
        </div><!-- /.form-field -->  
          
        <!-- TODO: 在这里追加其他自定义字段表单，如： -->  
          
        <!--  
        <div class="form-field">  
            <label for="term_meta[tax_keywords]">分类关键字</label>  
            <input type="text" name="term_meta[tax_keywords]" id="term_meta[tax_keywords]" value="" />  
            <p class="description">输入分类关键字</p>  
        </div>  
        -->  
    <?php  
    } // add_tax_image_field  
   
    /** 
     * 编辑分类页面添加自定义字段输入框 
     * 
     * @uses get_option()       从option表中获取option数据 
     * @uses esc_url()          确保字符串是url 
     */  
    public function edit_tax_image_field( $term ){  
          
        // $term_id 是当前分类的id  
        $term_id = $term->term_id;  
          
        // 获取已保存的option  
        $term_meta = get_option( "ludou_taxonomy_$term_id" );  
        // option是一个二维数组  
        $image = $term_meta['tax_image'] ? $term_meta['tax_image'] : '';  
          
        /** 
         *   TODO: 在这里追加获取其他自定义字段值，如： 
         *   $keywords = $term_meta['tax_keywords'] ? $term_meta['tax_keywords'] : ''; 
         */  
    ?>  
        <tr class="form-field">  
            <th scope="row">  
                <label for="term_meta[tax_image]">分类封面</label>  
                <td>  
                    <input type="text" name="term_meta[tax_image]" id="term_meta[tax_image]" value="<?php echo esc_url( $image ); ?>" />  
                    <p class="description">输入分类封面图片URL</p>  
                </td>  
            </th>  
        </tr><!-- /.form-field -->  
          
        <!-- TODO: 在这里追加其他自定义字段表单，如： -->  
          
        <!--  
        <tr class="form-field">  
            <th scope="row">  
                <label for="term_meta[tax_keywords]">分类关键字</label>  
                <td>  
                    <input type="text" name="term_meta[tax_keywords]" id="term_meta[tax_keywords]" value="<?php echo $keywords; ?>" />  
                    <p class="description">输入分类关键字</p>  
                </td>  
            </th>  
        </tr>  
        -->  
          
    <?php  
    } // edit_tax_image_field  
   
    /** 
     * 保存自定义字段的数据 
     * 
     * @uses get_option()      从option表中获取option数据 
     * @uses update_option()   更新option数据，如果没有就新建option 
     */  
    public function save_tax_meta( $term_id ){  
   
        if ( isset( $_POST['term_meta'] ) ) {  
              
            // $term_id 是当前分类的id  
            $t_id = $term_id;  
            $term_meta = array();  
              
            // 获取表单传过来的POST数据，POST数组一定要做过滤  
            $term_meta['tax_image'] = isset ( $_POST['term_meta']['tax_image'] ) ? esc_url( $_POST['term_meta']['tax_image'] ) : '';  
  
            /** 
             *   TODO: 在这里追加获取其他自定义字段表单的值，如： 
             *   $term_meta['tax_keywords'] = isset ( $_POST['term_meta']['tax_keywords'] ) ? $_POST['term_meta']['tax_keywords'] : ''; 
             */  
  
            // 保存option数组  
            update_option( "ludou_taxonomy_$t_id", $term_meta );  
   
        } // if isset( $_POST['term_meta'] )  
    } // save_tax_meta  
   
} // Ludou_Tax_Image  
   
// $wptt_tax_image = new Ludou_Tax_Image();

//  add 新增编辑term_group字段

class Update_Term_Group{  
   
    function __construct(){  
          
        // 新建分类页面添加自定义字段输入框  
        add_action( 'category_add_form_fields', array( $this, 'mbt_add_category_field' ) );  
        // 编辑分类页面添加自定义字段输入框  
        add_action( 'category_edit_form_fields', array( $this, 'mbt_edit_category_field' ) );  
  
        // 保存自定义字段数据  
        add_action( 'edited_category', array( $this, 'mbt_taxonomy_metadate' ), 10, 1 );  
        add_action( 'create_category', array( $this, 'mbt_taxonomy_metadate' ), 10, 1 );  
   
   
    } // __construct  

    function mbt_add_category_field(){ 
        echo '<div class="form-field"> 
        <label for="term_group">term_group</label> 
        <select name="_term_order" id="term_group" value="">
            <option value="0">未设置</option>
            <option value="1">作者</option>
        </select><br>
        <p>term_group的值</p> 
        </div>'; 
       } 
        
       // 分类编辑字段 
       function mbt_edit_category_field($tag){ 
        echo '<tr class="form-field"> 
        <th scope="row"><label for="term_group">term_group</label></th> 
        <td>
        <select name="_term_order" id="term_group">
            <option value="0">未设置</option>
            <option value="1" '; 
            echo ( $tag->term_group == 1 ) ? 'selected' : '';
            echo '>作者</option>
        </select><br> 
        <span class="cat-num">'.$tag->name.' 的term_group</span> 
        </td> 
        </tr>'; 
       }
        
       // 保存数据 
       function mbt_taxonomy_metadate($term_id){ 
        global $wpdb;
        if( isset( $_POST['_term_order'] ) ) {$wpdb->update( $wpdb->terms,array('term_group' => $_POST['_term_order']),array( 'term_id'=> $term_id));} 
       }  
   
}
   
// $update_term_group = new Update_Term_Group();
```

新增自定义分类

```
//  新增author分类

function author_init() {
    // create a new taxonomy
    $labels = array(   
        'name' => '作者',    
        'singular_name' => 'author',   
        'search_items' =>  '搜索' ,   
        'popular_items' => '热门' ,   
        'all_items' => '所有' ,   
        'parent_item' => null,   
        'parent_item_colon' => null,   
        'edit_item' => '编辑' ,    
        'update_item' => '更新' ,   
        'add_new_item' => '添加' ,   
        'new_item_name' => '作者名称',   
        'separate_items_with_commas' => '按逗号分开' ,   
        'add_or_remove_items' => '添加或删除',   
        'choose_from_most_used' => '从经常使用的类型中选择',   
        'menu_name' => '作者分类',   
    ); 
	register_taxonomy(
		'author',
		'post',
		array(
			'hierarchical' => true,   
            'labels' => $labels,   
            'show_ui' => true,   
            'query_var' => true,   
            'rewrite' => array( 'slug' => 'author' ),  
        )
	);
}
add_action( 'init', 'author_init' );
```