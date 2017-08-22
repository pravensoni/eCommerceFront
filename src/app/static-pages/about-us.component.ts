import { Component } from '@angular/core';

@Component({
  selector: 'about-us',
  template: `<div class="container" style="font-size: 16px">
  <div class="row col-md-offset-2 col-md-8 col-xs-12">
<h1>About Us</h1><br>
  <p>fidgetcube.in is operated by&nbsp;<strong>Bachelor Baba Online</strong></p>
<div>
<p>With the penetration of internet at such a fast rate in India, people can now discover but not buy the&nbsp;<strong>up and coming products</strong>&nbsp;that are developed in foreign countries and if there are stores that provide international shipping, the delivery times are very high and there is no guarantee of the quality. Even if somebody finds the courage to buy it, there is no way to avail&nbsp;a return or a refund.</p>
<p>What we try to do at Bachelor Baba is make such products&nbsp;<strong>accessible</strong>. But at the same time, make sure that the&nbsp;<strong>quality is above all standards</strong>.</p>
<p>Since, the world is not perfect, there might be like&nbsp;one in a million (almost zero but still) situations that brings out cases like manufacturing defects or delayed delivery (which are certainly not in our control though we try to tie up with the best of manufacturers and shipping partners) but for that we have our&nbsp;<a [routerLink]="['/refund-policy']">return and refund polices</a>. We attend to such matters with the utmost of our attention and integrity and provide the best of&nbsp;<a [routerLink]="['/contact-us']">customer support</a>&nbsp;to our customers.</p>
<p>We are just getting started.&nbsp;There's are tons of products lined up for you.&nbsp;</p>
<p>More importantly, if you have any product recommendations, please fire away towards us and we'll try everything to bring that to you.</p>
</div>
</div>
</div>
<footer-main></footer-main>`
})

export class AboutUsComponent { 

}