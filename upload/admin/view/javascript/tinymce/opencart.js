window.onload = function () {
  var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var useLang = document.querySelector('html').getAttribute('lang');

  tinymce.init({
    selector: '.tiny',
    language: useLang,
    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    file_picker_callback: function (cb) {
      $('#modal-image').remove();
      $.ajax({
        url: 'index.php?route=common/filemanager&user_token=' + getURLVar('user_token'),
        dataType: 'html',
        beforeSend: function () {
          $('#button-image i').replaceWith('<i class="fa fa-circle-o-notch fa-spin"></i>');
          $('#button-image').prop('disabled', true);
        },
        complete: function () {
          $('#button-image i').replaceWith('<i class="fa fa-upload"></i>');
          $('#button-image').prop('disabled', false);
        },
        success: function (html) {
          $('body').append('<div id="modal-image" class="modal">' + html + '</div>');
          $('#modal-image').modal('show');
          $('#modal-image').css("z-index", "2000");
          $('#modal-image').delegate('a.thumbnail', 'click', function (e) {
            e.preventDefault();
            cb($(this).attr('href'), { text: '' });
            $('#modal-image').modal('hide');
          });
        }
      });
    },
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | mycode | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview save print | insertfile image media template link anchor codesample | ltr rtl | code',
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: '10s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '1m',
    image_advtab: true,
    importcss_append: true,
    template_cdate_format: '[Date Created (CDATE): %d/%m/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %d/%m/%Y : %H:%M:%S]',
    height: 400,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    skin: useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });
};
