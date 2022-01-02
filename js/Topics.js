function get_values(data) {
  //  Gets Key,Values
  const keys = Object.keys(data);
  const values = [];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    values.push(data[key]);
  }
  //  console.log("values ", values, "keys ",keys)
  return [values, keys];
};


function process_json(jsonData) {
  var result = [];
  //Put each column in a column in a matrix
  const keys = Object.keys(jsonData);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    result.push(jsonData[key]);
  }
  return result
};


function populate(dom_elem, item, idx, class_name, dom_summary, topic) {
  //populates all the tables except the stats

  for (i = 0; i < item[idx].length; i++) {
    if (typeof item[idx][i] !== "undefined") {

      $(dom_elem).append('<tr><td class="' + class_name + '"> ' + item[idx][i] + '</td></tr>');

    }
  }

};

function populate_groups(dom_elem, item, idx, class_name, data_pages, dom_summary, topic) {
  //populates all the tables except the stats
  var dict_pages = new Object();
  var count_types = new Object();
  for (let i = 0; i < data_pages.length; i++) {
    var obj = data_pages[i];

    dict_pages[obj.index] = obj.Type
  }
  console.log('console log page type ', data_pages[0])
  //classify pages from topic 0
  //  console.log("PRINTING dictionary", dict_pages[obj.index])
  var media = 0,
    public = 0,
    political = 0;

  for (i = 0; i < item.length - 1; i++) {
    if (typeof item[idx][i] !== "undefined") {

      // get info about the tipe of the media
    //  console.log("page 0", item[idx][i])
      if (item[idx][i] in dict_pages) {


        var type = dict_pages[item[idx][i]]
        if (type == 'Media') {
          media = media + 1;

        } else {
          if (type == 'Public') {
            public = public + 1

          } else {
            if (type == 'Political') {

              political = political + 1
            }
          }
        }

        console.log("type 0", dict_pages[item[idx][i]])

      }
    }



    //ennd the type of the media

    $(dom_elem).append('<tr><td class="' + class_name + '"> ' + item[idx][i] + '</td><td>' + dict_pages[item[idx][i]] + '</td></tr>');

  }
  //}
  //}

  console.log("types: media ", media, " public ", public, " pol ", political)
  $(dom_summary).append('<table><tr><td>The top groups/pages related to: ' + topic.toUpperCase().bold() + ', reveal that: </td></tr><tr><td>- ' +
    media.toString().bold() + ' are from news media; </td></tr><tr>' +
    '<td>- ' + public.toString().bold() + ' are from the general public; </td></tr><tr>' +
    '<td>- ' + political.toString().bold() + ' have a  political orientation. </td><tr></table>'
  );



}; // end  populate groups function



function populate_bot_keywords(dom_elem, item, idx, class_name) {
  $(dom_elem).append('<tr><td class="' + class_name + '"> ' + item[idx].join(", ") + '</td></tr>');
};


function populate_read_extract(dom_elem, item, class_name) {
  //populates all the tables except the stats
  for (i = 0; i < item.length; i++) {
    if (typeof item[i] !== "undefined") {
      $(dom_elem).append('<tr><td class="' + class_name + '"> ' + item[i] + '</td></tr>');
    }
  }
};



function populate_stats(dom_elem, text, item, idx) {
  // populates stats table
  $(dom_elem).append('<tr><td>' + text + '</td><td>' + Math.round(item[idx] * 100) / 100 + ' %</td></tr>');
};


// aqui saco el dictionario de TODAS LAS PAGINAS y su tipo
// el problema es que este diccionario no es global, etnonces lo que tengo que hcer
// es q cuando populo la tabla de populate_group, ahi tengo q checar a q tipo de pagina es media, public, political



function show_menu(jsonData, data_pages) {

  const result = process_json(jsonData);
  //get the labels
  let tps = get_values(result[2]) //this are the topics keys and values from the results[2] that are topics
  const topics = tps[0],
    keys = tps[1];
  var select = document.getElementById("select_topic");
  //  import { id } from './app.js'
  console.log("here is the data ", topics);
  //print("trying to get url",id);

  /*gets all the groups*/
  let groups = get_values(result[4])
  const g_name = groups[0],
    g_keys = groups[1];
  /**/
  /*gets all the authors */
  let authors = get_values(result[5])
  const a_name = authors[0],
    a_keys = authors[1];
  /**/
  /*gets keywords bots*/
  let bot_keywords = get_values(result[18])
  const b_keyword = bot_keywords[0],
    b_keys = bot_keywords[1];
  /**/
  /*gets posts conservative*/
  let con_post = get_values(result[14])
  const con__p_content = con_post[0],
    con_p_keys = con_post[1];
  /**/
  /*gets posts neutral*/
  let neu_post = get_values(result[15])
  const neu_p_content = neu_post[0],
    neu_p_keys = neu_post[1];
  /**/
  /*gets posts nliberal*/
  let lib_post = get_values(result[16])
  const lib_p_content = lib_post[0],
    lib_p_keys = lib_post[1];
  /**/
  var option = '';
  selec = true;
  // Populates the Menu chooses the firs topic as default
  for (var i = 0; i < topics.length; i++) {
    if (selec) {
      option += '<option selected>' + topics[i] + '</option>';
      $("#title_table_c_posts").append('Conservative Posts Topic: ' + topics[i]);
      $("#title_table_n_posts").append('Neutral Posts Topic: ' + topics[i]);
      $("#title_table_l_posts").append('Liberal Posts Topic: ' + topics[i]);
      $("#card-id-groups").append('Frequent Groups/Pages Topic: ' + topics[i]);
      $("#card-id-type").append('Type of groups/pages generating content for topic: ' + topics[i]);
      $("#card-id-keywords").append('Frequent Bots Keywords Topic: ' + topics[i]);
      selec = false;
    } else {
      option += '<option>' + topics[i] + '</option>';
    }
  }
  $('#select_topic').append(option); // here appends all the available topics on jsonData
  // end populating Menu
  /* Populates the menu with the elements of the first topic that is the default*/
  /*
  SECTION CALCULATE DATA TO GET THE PERCENTAGE FOR THAT INDEX*/
  //get page groups in dataset
  let pages = get_values(result[4]);
  const pages_names = pages[0],
    pages_keys = pages[1]; //this is all the pages
//  console.log("pages per group", pages_names)
  var merged_pages = [].concat.apply([], pages_names);
  var uniq_pages = [...new Set(merged_pages)];
  //console.log("uniq pages per group", uniq_pages)
//  console.log(merged_pages);
  ///
  let labs = get_values(result[2]);
  const labels = labs[0],
    labels_keys = labs[1];
  //data 8-1
  //percentage of Posts
  let pst = get_values(result[1]);
  var perc_posts = pst[0],
    posts_keys = pst[1];
  //like_percentage
  let lks = get_values(result[8]);
  var perc_likes = lks[0],
    likes_keys = lks[1];
  //comment_percentage
  let cms = get_values(result[9])
  var perc_comments = cms[0],
    comm_keys = cms[1];
  //engagement_percentage
  let engp = get_values(result[10])
  var perc_eng = engp[0],
    eng_keys = engp[1];

  let botp = get_values(result[17])
  var perc_bot = botp[0],
    bot_keys = botp[1];
  //  let botw = get_values(result[16])
  //  var kwbot = botw[0],
  //    bot_keys = botw[1];
  perc_posts = perc_posts.map(function(x) {
    return (x * 100).toFixed(2);
  })
  perc_likes = perc_likes.map(function(x) {
    return (x * 100).toFixed(2);
  })
  perc_comments = perc_comments.map(function(x) {

    return (x * 100).toFixed(2);
  })
  perc_eng = perc_eng.map(function(x) {
    return (x * 100).toFixed(2);
  })


  perc_bot = perc_bot.map(function(x) {
    return (x * 100).toFixed(2);
  })



  /*END SECTION   */ //El 0 es porque se popula con el primer tema que es el 0

  // Get info from the pages, the type of pages, media, groups, public


  populate_groups('#table_groups', g_name, 0, "mdi mdi-bulletin-board", data_pages, '#table_summary', topics[0]);


  populate('#table_c_posts', con__p_content, 0, "mdi mdi-account-circle", '#table_summary', topics[0]);
  populate('#table_n_posts', neu_p_content, 0, "mdi mdi-account-circle", '#table_summary', topics[0]);
  populate('#table_l_posts', lib_p_content, 0, "mdi mdi-account-circle", '#table_summary', topics[0]);

  populate_bot_keywords('#table_bot_keywords', b_keyword, 0, "mdi mdi-account-circle");


  populate_read_extract('#table_all_pages', uniq_pages, "mdi mdi-account-circle")


  populate_stats('#table_stats', 'Perc. Posts', perc_posts, 0)
  populate_stats('#table_stats', 'Perc. Likes', perc_likes, 0)
  populate_stats('#table_stats', 'Perc. Comments', perc_comments, 0)
  populate_stats('#table_stats', 'Perc. Engagement', perc_eng, 0)
  populate_stats('#table_stats', 'Perc. Bots', perc_bot, 0)

  //Add percentage comments of topic and percentage of engagement

  // Bot Kewords put in table
  //  var keywords = "None"

  //  keywords = kwbot.join(", ")


  //  $('#table_bot_keywords').append('<tr><td>' + 'Bot Content Keyword' + '</td><td>' + b_keyword + ' </td></tr>');

  DrawBubbleChart(jsonData, 0)
  DrawPolLeaningChart(jsonData, 0);

  DrawBarChart(jsonData, 0);
  calculate_void(jsonData, 0, topics[0]);
  /* Finish populating tables with first element*/


  //Primeor popula con el tema default y despues cambia de acuerdo la seleccion, es por eso q se hace doble
  ///Here you get the index of the group that was chosen
  $('#select_topic').on('change', function() {
    //Empty the values of the cards one another option is selected
    $("#bar-charts").empty();
    //  $("#bubblechart").empty();
    $("#table_groups").empty();
    $("#table_summary").empty();
    $("#table_authors").empty();
    $("#table_bot_keywords").empty();
    $("#table_stats").empty();
    $("#audience-chart").empty();
    $("#regional-chart").empty();

    $("#table_leaning").empty();
    $("#table_c_posts").empty();
    $("#table_c_posts").append('<table id="table_c_posts" class="table table-striped2 translate" style="table-layout: fixed; width:100%;"><thead></thead><tbody></tbody></table>');
    $("#table_n_posts").empty();
    $("#table_n_posts").append('<table id="table_n_posts" class="table table-striped2 translate" style="table-layout: fixed; width:100%;"><thead></thead><tbody></tbody></table>');
    $("#table_l_posts").empty();
    $("#table_l_posts").append('<table id="table_l_posts" class="table table-striped2 translate" style="table-layout: fixed; width:100%;"><thead></thead><tbody></tbody></table>');
    $("#title_table_c_posts").empty();
    $("#title_table_n_posts").empty();
    $("#title_table_l_posts").empty();
    $("#card-id-type").empty();
    $("#card-id-groups").empty();
    $("#card-id-keywords").empty();






    var optionText = $("#select_topic option:selected").text();
    var idx = 0; // index of the chosen topic
    for (let i = 0; i < keys.length; i++) {
      if (topics[i] == optionText) {
        idx = i
        break
      }
    }

    $("#title_table_c_posts").append('Conservative Posts Topic: ' + optionText);
    $("#title_table_n_posts").append('Neutral Posts Topic: ' + optionText);
    $("#title_table_l_posts").append('Liberal Posts Topic: ' + optionText);
    $("#card-id-groups").append('Frequent Pages/Groups Topic: ' + optionText);
    $("#card-id-type").append('Type of groups/pages generating content for topic: ' + optionText);
    $("#card-id-keywords").append('Frequent Bot Keywords Topic: ' + optionText);

    //get frequent groups results[4]
    //  $('#frequent_groups').append('');


    populate_groups('#table_groups', g_name, idx, "mdi mdi-bulletin-board", data_pages, '#table_summary', optionText);
    //get frequent authors results[5]
    //  populate('#table_posts', con__p_content, idx, "mdi mdi-account-circle");
    populate_bot_keywords('#table_bot_keywords', b_keyword, idx, "mdi mdi-account-circle");
    populate('#table_c_posts', con__p_content, idx, "mdi mdi-account-circle", '#table_summary', optionText);
    populate('#table_n_posts', neu_p_content, idx, "mdi mdi-account-circle", '#table_summary', optionText);
    populate('#table_l_posts', lib_p_content, idx, "mdi mdi-account-circle", '#table_summary', optionText);
    //    $('#frequent_authors').append('');
    populate_stats('#table_stats', 'Perc. Posts', perc_posts, idx)
    populate_stats('#table_stats', 'Perc. Likes', perc_likes, idx)
    populate_stats('#table_stats', 'Perc. Comments', perc_comments, idx)
    populate_stats('#table_stats', 'Perc. Engagement', perc_bot, idx)
    populate_stats('#table_stats', 'Perc. Bots', perc_bot, idx)


    //  DrawPolLeaningChart(jsonData, idx);
    DrawBarChart(jsonData, idx);
    calculate_void(jsonData, idx, optionText);

  }); //close the select topic on change function


}; //end show menu

//read a specific column an put in in a listen


function DrawBubbleChart(jsonData, idx) {
  const result = process_json(jsonData);

  //total posts per topics
  let totposts = get_values(result[0]);
  const tot_n = totposts[0],
    tot_keys = totposts[1];
  console.log("totals", tot_n)

  //each_topic_result
  let labs = get_values(result[2]);
  const labels = labs[0],
    labels_keys = labs[1];
  console.log("labels", labels)
  //data 8-1
  //conservative
  let cons = get_values(result[11]);
  const con_n = cons[0],
    con_keys = cons[1];
  //  console.log("conservatives:", con_n)
  //neutral
  let neu = get_values(result[12]);
  const neu_n = neu[0],
    neu_keys = neu[1];
  //  console.log("neutral:", neu_n)
  //liberal
  let lib = get_values(result[13])
  const lib_n = lib[0],
    lib_keys = lib[1];
  //  console.log("liberal:", lib_n)

  //get percentage of conservative, liberal, neutral
  var percent_con = [];
  for (var i = 0; i < con_n.length; i++) {
    percent_con.push(((con_n[i] / tot_n[i]) * 100).toFixed(2));
  }
  //  console.log("percentage con",percent_con)
  var percent_neu = [];
  for (var i = 0; i < con_n.length; i++) {
    percent_neu.push(((neu_n[i] / tot_n[i]) * 100).toFixed(2));
  }
  //  console.log("percentage neu",percent_neu)

  var percent_lib = [];
  for (var i = 0; i < lib_n.length; i++) {
    percent_lib.push(((lib_n[i] / tot_n[i]) * 100).toFixed(2));
  }



  /*buble chart*/
  sum_label_0 = con_n[0] + neu_n[0] + lib_n[0];
  sum_label_1 = con_n[1] + neu_n[1] + lib_n[1];
  sum_label_2 = con_n[2] + neu_n[2] + lib_n[2];
  sum_label_3 = con_n[3] + neu_n[3] + lib_n[3];
  sum_label_4 = con_n[4] + neu_n[4] + lib_n[4];
  sum_label_5 = con_n[5] + neu_n[5] + lib_n[5];
  sum_label_6 = con_n[6] + neu_n[6] + lib_n[6];
  sum_label_7 = con_n[7] + neu_n[7] + lib_n[7];
  sum_label_8 = con_n[8] + neu_n[8] + lib_n[8];
  sum_label_9 = con_n[9] + neu_n[9] + lib_n[9];
  sum_label_10 = con_n[10] + neu_n[10] + lib_n[10];

  dataset = {
    "children": [{
        "Name": labels[0],
        "Count": sum_label_0
      },
      {
        "Name": labels[1],
        "Count": sum_label_1
      },


      {
        "Name": labels[2],
        "Count": sum_label_2
      },


      {
        "Name": labels[3],
        "Count": sum_label_3
      },


      {
        "Name": labels[4],
        "Count": sum_label_4
      },
      {
        "Name": labels[5],
        "Count": sum_label_5
      },


      {
        "Name": labels[6],
        "Count": sum_label_6
      },



      {
        "Name": labels[7],
        "Count": sum_label_7
      },
      {
        "Name": labels[8],
        "Count": sum_label_8
      },
      {
        "Name": labels[9],
        "Count": sum_label_9
      },
      {
        "Name": labels[10],
        "Count": sum_label_10
      }

    ]
  };

  var diameter = 400 / 1.2;
  var height = 300 / 1.2;
  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var bubble = d3.pack(dataset)
    .size([diameter, height])
    .padding(0.1);

  var svg = d3.select("#bubblechart")
    .append("svg")
    .attr("width", diameter)
    .attr("height", height)
  //  .attr('display','inline-block')
    .attr("align", "center");
    //.attr("preserveAspectRatio", "xMinYMin meet")
    //.attr("viewBox", "0 0 300 300")
    //.classed("svg-content", true);

  var nodes = d3.hierarchy(dataset)
    .sum(function(d) {
      return d.Count;
    });

  var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d) {
      return !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  node.append("title")
    .text(function(d) {
      return d.Name + ": " + d.Count;
    });

  node.append("circle")
    .attr("r", function(d) {
      return d.r;
    })
    .style("fill", function(d, i) {
      return color(i);
    });

  node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
      return d.data.Name.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d) {
      return d.r / 3;
    })
    .attr("fill", "white");

  node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
      return d.data.Count;
    })
    .attr("font-family", "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d) {
      return d.r / 3;
    })
    .attr("fill", "white");

  d3.select(self.frameElement)
    .style("height", height + "px");




  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var bubble = d3.pack(dataset)
    .size([diameter, height])
    .padding(0);

  var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d) {
      return !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });


  $("#bubblelegend").append('<tr><td>' + labels[0] + '</td><td>' + sum_label_0 + '</td><td>' + labels[1] + '</td><td>' + sum_label_1 + '</td></tr>');
  $("#bubblelegend").append('<tr><td>' + labels[2] + '</td><td>' + sum_label_2 + '</td><td>' + labels[3] + '</td><td>' + sum_label_3 + '</td></tr>');
  $("#bubblelegend").append('<tr><td>' + labels[4] + '</td><td>' + sum_label_4 + '</td><td>' + labels[5] + '</td><td>' + sum_label_5 + '</td></tr>');
  $("#bubblelegend").append('<tr><td>' + labels[6] + '</td><td>' + sum_label_6 + '</td><td>' + labels[7] + '</td><td>' + sum_label_7 + '</td></tr>');
  $("#bubblelegend").append('<tr><td>' + labels[8] + '</td><td>' + sum_label_8 + '</td><td>' + labels[9] + '</td><td>' + sum_label_9 + '</td></tr>');
  $("#bubblelegend").append('<tr><td>' + labels[10] + '</td><td>' + sum_label_10 + '</td><td></td><td></td></tr>');

  /*function resize() {
    initialWidth = document.getElementById('bubblechart').clientWidth;
    initialHeight = document.getElementById('bubblechart').clientWidth;



    var finalWidth = diameter/2;
    var finalHeight = height/2;
    if ((initialWidth < finalWidth) || (initialHeight < finalHeight)) {
      //expand
        initialWidth=400;
        initialHeight=600;
    } else {
         finalWidth = initialWidth/2;
         finalHeight = initialHeight/2;
    }




    d3.select('#bubblechart svg')
      .attr('width', initialWidth)
      .attr('height', finalHeight)
      .attr('align','center');
}

window.onresize = resize;*/

  /*end bubble*/

}
//$("#bubblelegend").append('<tr><th>Topic</th><th>Number Posts</th><th>Topic</th><th>Number Posts</th></tr>');

//"Name": labels[4],
//"Count": con_n[4] + neu_n[4] + lib_n[4]


var myChart;

function DrawPolLeaningChart(jsonData, idx) {

  const result = process_json(jsonData);

  //total posts per topics
  let totposts = get_values(result[0]);
  const tot_n = totposts[0],
    tot_keys = totposts[1];
  console.log("totals", tot_n)

  //each_topic_result
  let labs = get_values(result[2]);
  const labels = labs[0],
    labels_keys = labs[1];
  console.log("labels", labels)
  //data 8-1
  //conservative
  let cons = get_values(result[11]);
  const con_n = cons[0],
    con_keys = cons[1];
  //  console.log("conservatives:", con_n)
  //neutral
  let neu = get_values(result[12]);
  const neu_n = neu[0],
    neu_keys = neu[1];
  //  console.log("neutral:", neu_n)
  //liberal
  let lib = get_values(result[13])
  const lib_n = lib[0],
    lib_keys = lib[1];
  //  console.log("liberal:", lib_n)

  //get percentage of conservative, liberal, neutral
  var percent_con = [];
  for (var i = 0; i < con_n.length; i++) {
    percent_con.push(((con_n[i] / tot_n[i]) * 100).toFixed(2));
  }
  //  console.log("percentage con",percent_con)
  var percent_neu = [];
  for (var i = 0; i < con_n.length; i++) {
    percent_neu.push(((neu_n[i] / tot_n[i]) * 100).toFixed(2));
  }
  //  console.log("percentage neu",percent_neu)

  var percent_lib = [];
  for (var i = 0; i < lib_n.length; i++) {
    percent_lib.push(((lib_n[i] / tot_n[i]) * 100).toFixed(2));
  }
  //  console.log("percentage neu",percent_lib)


  // Put number of posts per leaning in table
  $('#table_leaning').append('<tr><td>' + 'Conservative' + '</td><td>' + percent_con + ' </td></tr>');
  $('#table_leaning').append('<tr><td>' + 'Neutral' + '</td><td>' + percent_neu + ' </td></tr>');
  $('#table_leaning').append('<tr><td>' + 'Liberal' + '</td><td>' + percent_lib + ' </td></tr>');
  /* this is the political leaning chart */


  if ($("#pol_leaning").length) {

    //    $("#pol_leaning").empty()

    //  if (myChart) {

    //    myChart.destroy()

    //  }
    //  console.log('the_labels: ', labels)
    //  console.log("conservatives:", con_n)
    // political leaning chart
    var barOptions_stacked = {
      tooltips: {
        enabled: true
      },
      responsive: true,
      maintainAspectRatio: true,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 20,
          bottom: 0
        }
      },

      hover: {
        animationDuration: 0
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            fontFamily: "sans-serif",
            fontSize: 10
          },
          scaleLabel: {
            display: false
          },
          gridLines: {},
          stacked: true
        }],
        yAxes: [{
          gridLines: {
            display: false,
            color: "#000",
            zeroLineColor: "#000",
            zeroLineWidth: 0
          },
          ticks: {
            fontFamily: "sans-serif",
            fontSize: 10
          },
          stacked: true
        }]
      },
      legend: {
        display: true
      },

      /*    animation: {
            onComplete: function() {
              var chartInstance = this.chart;
              var ctx = chartInstance.ctx;
              ctx.textAlign = "center";

              ctx.textBaseline = 'top';
          //    ctx.font = "16px Open Sans";
              ctx.fillStyle = "#ffffff";;

              Chart.helpers.each(this.data.datasets.forEach(function(dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                Chart.helpers.each(meta.data.forEach(function(bar, index) {
                  data = dataset.data[index];
                  console.log("i vale", i)
                  if (i == 0) {
                    ctx.fillText(data, bar._model.x , bar._model.y + 4);
                  } else
                   {
                     if (i==1){
                    ctx.fillText(data, bar._model.x -50, bar._model.y + 4);
                  }
                  else {

                          ctx.fillText(data, bar._model.x - 10, bar._model.y + 4);

                  }
                  }
                }), this)
              }), this);
            }
          }, */
      pointLabelFontFamily: "Quadon Extra Bold",
      scaleFontFamily: "Quadon Extra Bold",
    };



    var ctx = document.getElementById("pol_leaning");
    myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        //  labels: ["2014", "2013", "2012", "2011","2010","2009","2008","2007","2006","2005","2004"],
        labels: labels,

        datasets: [{
          label: 'Conservative',
          //data: [727, 589, 537, 543, 574,345,727, 589, 537, 543, 574],
          data: percent_con,
          backgroundColor: "rgba(204,0,0,1)",
          hoverBackgroundColor: "rgba(255,0,0,1)"
        }, {
          label: 'Neutral',
          //  data: [238, 553, 746, 884, 903,323,727, 589, 537, 543, 574],
          data: percent_neu,
          backgroundColor: "rgba(153,163,164,1)",
          hoverBackgroundColor: "rgba(121,125,127,1)"
        }, {
          label: 'Liberal',
          //data: [1238, 553, 746, 884, 903,222,727, 589, 537, 543, 574],
          data: percent_lib,
          backgroundColor: "rgba(0,0,255,1)",
          hoverBackgroundColor: "rgba(0,102,255,1)"
        }, ]
      },

      options: barOptions_stacked,
    }); //end pol chart

  }

}; //end pol_chart

function checInfinite(num) {

  if (isFinite(num)) {
    return num
  }
  return 0
}

function calculate_void(jsonData, idx, topic) {
  //array data contains the number of media,political o public posts
  //temp data

  $('#table_summary').empty();

  const result = process_json(jsonData);
  //stores the values of media posts, citizens, and politics
  const array_types = [];
  console.log("data being recieved (idx,topic): ", idx, topic)
  console.log("distribution", result[19])
  //posts per type, media, political, citizens

  //get page groups in dataset
  let pp_type = get_values(result[19]);
  const tot_types = pp_type[0],
    tot_type_keys = pp_type[1]; //this is all the pages

  console.log('types', tot_types)
  for (i = 0; i < tot_types[idx].length; i++) {
    array_types.push(tot_types[idx][i])

  }
  console.log("array types", array_types)

  // [politics,media, citizens]
  //  var num_political_posts = array_data[0];
  //  var num_media_posts = array_data[1];
  //  var num_citizen_posts = array_types[2];
  //

  //Case that media is bigger than the other groups:

  //  var media_wrespect_media = 100;
  //  var public_wrespect_public = 100;
  //with respect to media:
  //  var media_wrespect_public = checInfinite((100 * num_public_posts) / num_media_posts)
  //  var public_wrespect_politics = checInfinite((100 * num_political_posts) / num_public_posts)
  // In case public are bigger than 60% de los political o los media posts: Topics X  is being heavily commented in the groups from public, However media and political groups are talking less about it with x and y posts

  //economy
  //if ((idx==0) || (idx==2)){
  //  if ((public_wrespect_public - public_wrespect_politics) > 60 ) {
  //    $('#table_summary').append('<tr><td>The topic ' + topic.toUpperCase() +
  //      ' to have received considerable attention in groups/pages from the general public as there are ' + num_public_posts.toString().bold()  + ' posts within them;  ' +
  //      'however, the news media and political groups/pages are talking less about it. For instance, political groups/pages published ' + num_political_posts.toString().bold() +
  //      ' posts about the topic; meanwhile, the groups/pages from news media contain ' + num_media_posts.toString().bold() + ' posts about the topic.');
  //    $('#table_summary').append('</td></tr>');

  //  }
  //}
  //  var media_wrespect_potlical = preventInfinate((100 * num_political_posts)/num_media_posts)
  // In case media are bigger than 60% de los political o citiizens, Topics X  is being heavily commented in the groups from media news outlets, however this topics seems of no interest to political or citiizens
  //  console.log("calculos ", idx, (media_wrespect_media - media_wrespect_public))
  //  if ((media_wrespect_media - media_wrespect_public) > 60) {
  //    $('#table_summary').append('<tr><td>The topic ' + topic.toUpperCase() +
  //      ' to have received considerable attention in news media groups/pages as there are ' + num_media_posts.toString().bold() + ' posts within them;  ' +
  //      'however, the public and political groups/pages are talking less about it. For instance, political groups/pages published ' + num_political_posts.toString().bold() +
  //      ' posts about the topic; meanwhile, the groups/pages from the general public contain ' + num_public_posts.toString().bold() + ' posts about the topic.');
  //    $('#table_summary').append('</td></tr>');

  //  }
  // In case political are bigger than 60% de los citizens or media, Topic X   is being heavily commented in the groups from  politics , However media and political groups are talking less about it with x and y posts

}

var barChart;

function DrawBarChart(jsonData, idx) {
  // idx is the topic selected

  const result = process_json(jsonData);
  const array_types = [];

  //posts per type, media, political, citizens

  //get page groups in dataset
  let pp_type = get_values(result[19]);
  const tot_types = pp_type[0],
    tot_type_keys = pp_type[1]; //this is all the pages

  console.log('types', tot_types)
  for (i = 0; i < tot_types[idx].length; i++) {
    array_types.push(tot_types[idx][i])

  }
  console.log("array types", array_types)





  //total posts per topics
  //  let totposts = get_values(result[0]);
  //  const tot_n = totposts[0],
  //    tot_keys = totposts[1];

  //  console.log("totals", tot_n)

  //each_topic_result
  //  let labs = get_values(result[2]);
  //  const labels = labs[0],
  //    labels_keys = labs[1];
  //  console.log("labels", labels)

  if ($("#bar-charts").length) {

    if (barChart) {
      barChart.destroy();
    }
    //    $('#bar-charts').remove();
    //    $('#bar-chart-container').append('<canvas id="bar-charts"></canvas>');
    var barChartCanvas = $("#bar-charts").get(0).getContext("2d");

    barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: {
        //  labels: labels,
        labels: ['Political', 'Media', 'Citizens'],
        datasets: [{
          label: 'Number Posts',
          //data: perc_bot,
          data: array_types,
          backgroundColor: '#444444'
        }]
      },
      options: {
        hover: {
          animationDuration: 0
        },
        animation: {
          duration: 0,
          onComplete: function() {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            this.data.datasets.forEach(function(dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function(bar, index) {
                var data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },

        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            display: true,
            gridLines: {
              drawBorder: false,
              color: '#f1f3f9',

              display: true,
              zeroLineColor: '#f1f3f9'
            },
            ticks: {
              display: true,
              //    min: 0, //This is used if bartype is  'bar'
              //  max: 1,
              stepSize: 500,
              //  font-family: "Source Sans Pro", "sans-serif",
              fontColor: "#000",
              fontFamily: "sans-serif",
              fontSize: 10,
              padding: 10
            }
          }],
          xAxes: [{
            display: true,
            stacked: false,
            categoryPercentage: 1,
            ticks: {
              display: false,
              beginAtZero: false,
              display: true,
              padding: 10,
              fontSize: 11
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
              display: true
            },
            position: 'bottom',
            barPercentage: 0.7
          }]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        },

      }
    });


  } //Finish chart


}

function DrawTopicsChart(jsonData) {
  //  $("#audience-chart").empty();
  //  $("#task-chart").empty();
  $("#bar-charts").empty();



  const result = process_json(jsonData);
  //get the labels
  let labs = get_values(result[2]);
  const labels = labs[0],
    labels_keys = labs[1];
  //data 8-1
  //percentage of Posts
  let pst = get_values(result[8]);
  var perc_posts = pst[0],
    posts_keys = pst[1];
  //like_percentage
  let lks = get_values(result[8]);
  var perc_likes = lks[0],
    likes_keys = lks[1];
  //comment_percentage
  let cms = get_values(result[9])
  var perc_comments = cms[0],
    comm_keys = cms[1];
  //share percentage
  let engp = get_values(result[10])
  var perc_eng = engp[0],
    eng_keys = engp[1];

  perc_posts = perc_posts.map(function(x) {
    return (x * 100).toFixed(2);
  })
  perc_likes = perc_likes.map(function(x) {
    return (x * 100).toFixed(2);
  })
  perc_comments = perc_comments.map(function(x) {
    return (x * 100).toFixed(2);
  })
  perc_eng = perc_eng.map(function(x) {
    return (x * 100).toFixed(2);
  })

  /* Let's calculate the maximun value for the y-axis
  var max_perc_posts = Math.max.apply(Math, perc_posts);
  var max_perc_likes = Math.max.apply(Math, perc_likes);
  var max_perc_comments = Math.max.apply(Math, perc_comments);
  var max_perc_eng = Math.max.apply(Math, perc_eng);
  const all_max = [];
  const all_max.push(max_perc_posts);*/
  //all_max.push(max_perc_likes);
  //all_max.push(max_perc_comments);
  //all_max.push(max_perc_eng);
  //all_max.push(max_y_axis);
  //max_y_axis = Math.max.apply(Math,all_max );
  //console.log("percentage posts", max_y_axis )

  /* This is the topics chart*/
  if (AudienceChart) {
    AudienceChart.destroy();
  }
  var AudienceChartCanvas = $("#audience-chart").get(0).getContext("2d");
  var AudienceChart = new Chart(AudienceChartCanvas, {
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [
        //    {
        //      type: 'line',
        //      fill: false,
        //      data: [100, 230, 130, 140, 270, 140],
        //      borderColor: '#ff4c5b'
        //    },
        //    {
        //      label: 'Posts',
        //      data: perc_posts,
        //      backgroundColor: '#6640b2'
        //    },
        //    {
        //      label: 'Like',
        //      data: perc_likes,
        //      backgroundColor: '#1cbccd'
        //    },
        {
          label: 'Comments Percentage',
          data: perc_comments,
          backgroundColor: '#F1C40F'
        },
        {
          label: 'Posts Percentage',
          data: perc_posts,
          backgroundColor: '#FF6600'
        }
      ]
    },
    options: {
      /*    "hover": {
                "animationDuration": 0
            },
            "animation": {
                "duration": 1,
                "onComplete": function () {
                    var chartInstance = this.chart,
                    ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x + 10, bar._model.y +10);
                        });
                    });
                }
            }, */
      legend: {
        "display": false
      },
      tooltips: {
        "enabled": true
      },

      responsive: true,
      maintainAspectRatio: true,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 20,
          bottom: 0
        },

      },
      scales: {
        yAxes: [{
          display: true,
          gridLines: {
            display: true,
            drawBorder: false,
            color: "#f8f8f8",
            zeroLineColor: "#f8f8f8"
          },
          ticks: {
            display: true,
            //    min: 0, //This is used if bartype is  'bar'
            //  max: 100,
            stepSize: 100,
            //  font-family: "Source Sans Pro", "sans-serif",
            fontColor: "#000",
            fontFamily: "sans-serif",
            fontSize: 14,
            padding: 10
          }
        }],
        xAxes: [{
          stacked: false,
          ticks: {
            min: 0, //Remove this if you use type of char 'bar' instead of 'horizontalbar'
            max: 100,
            beginAtZero: true,
            fontColor: "#b1b0b0",
            fontSize: 10
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
            display: false
          },
          barPercentage: .9,
          categoryPercentage: .7,
        }]
      },
      legend: {
        display: false
      },
      elements: {
        point: {
          radius: 3,
          backgroundColor: '#ff4c5b'
        }
      },
      legendCallback: function(chart, labels) {
        //  console.log("xxxx",Object.keys(chart.data.datasets).length);
        var text = [];
        //First we obtain the size of the json where the labels from the graph come
        for (i = 0; i < Object.keys(chart.data.datasets).length; i++) {

          text.push('<div class="item mr-2 d-flex align-items-center ">');
          text.push('<div class="item-box mr-2" style=" background-color: ' + chart.data.datasets[i].backgroundColor + ' "></div><p class="text-black mb-0"> ' + chart.data.datasets[i].label + '</p>');
          text.push('</div>');
        }
        return text.join('');
      }
    },
  });
  document.querySelector('#audience-chart-legend').innerHTML = AudienceChart.generateLegend();

  let botp = get_values(result[17])
  var perc_bot = botp[0],
    bot_keys = botp[1];
  console.log("perc", perc_bot)
  perc_bot = perc_bot.map(function(x) {
    return (x * 100).toFixed(2);
  })

  if ($("#task-chart").length) {


    var taskChartCanvas = $("#task-chart").get(0).getContext("2d");
    if (taskChart) {
      taskChart.destroy();
    }
    var taskChart = new Chart(taskChartCanvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Percentage Bots',
          data: perc_bot,
          backgroundColor: '#9955BB'
        }]
      },
      options: {
        tooltips: {
          enabled: true
        },
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 20,
            bottom: 0
          }
        },
        scales: {
          yAxes: [{
            display: true,
            gridLines: {
              drawBorder: false,
              color: '#f1f3f9',

              display: true,
              zeroLineColor: '#f1f3f9'
            },
            ticks: {
              display: true,
              //    min: 0, //This is used if bartype is  'bar'
              //  max: 1,
              stepSize: 100,
              //  font-family: "Source Sans Pro", "sans-serif",
              fontColor: "#000",
              fontFamily: "sans-serif",
              fontSize: 14,
              padding: 10
            }
          }],
          xAxes: [{
            display: true,
            stacked: false,
            categoryPercentage: 1,
            ticks: {
              display: false,
              beginAtZero: false,
              display: true,
              padding: 10,
              fontSize: 11
            },
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
              display: true
            },
            position: 'bottom',
            barPercentage: 0.7
          }]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        },

      }
    });


  } //Finish chart







};
