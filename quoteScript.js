
        $(document).ready(function () {
            var quote;
            var author;
            var index = 0;
            var colors = ['lightblue', 'lightpink', '#001f3f', '#85144b'];
            var startingColor = colors[index + 1];
            
            $("body").css('background-color', startingColor);
            $(".message").css('color', startingColor);
            getNewQuote();
            
            
            function getNewQuote(){

                $.ajax({
                    url: 'http://api.forismatic.com/api/1.0/',
                    jsonp: 'jsonp',
                    dataType: 'jsonp',
                    data: {
                        method: 'getQuote',
                        lang: 'en',
                        format: 'jsonp'
                    },
                    success: function(response){
                        quote = response.quoteText;
                        author = response.quoteAuthor;
                        
                        if(author){

                            $('.message').text(quote + ' - '+ author);
                        } else {
                            author = "anon"
                            $('.message').text(quote + ' - anon');
                        }
                        
                    }

                })
            }
            
            $("#quoteButton").on("click", function (event) {
                event.preventDefault();
                var newColor = colors[index % colors.length];
                $("body").css('background-color', newColor);
                $(".message").css('color', newColor);
                getNewQuote();
                index = index + 1;
            });

            $('#tweet').on("click",function(event){

                event.preventDefault();
                window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(" '" + quote +"' " + ' - ' + author) )

             });

            $("#facebookPost").on("click",function(event){

                event.preventDefault;
                window.open("https://www.facebook.com/sharer/sharer.php?u="  + encodeURIComponent(" '" + quote +"' " + ' - ' + author));
            });
        });
