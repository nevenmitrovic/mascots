-Goal of the app, automatisation process of booking events for parties,
defining animators who is going and maskotas they are wearing. Keeping track of storage, 
every mascots has 2 quantities.

-Admin features:
    -CRUD animators (with all the informations)
    -CRUD events in less than minut over the phone
    -CRUD of event locations
    -CRUD of mascotas
    -GET financial reports

-Animators features:
    -READ the calendar
    -UPDATE events (1.confirming event day before, keep track who confirmed it, 2. Confirmation of money taking from event)

-Event feature:    
    -Sending informations to animators when a new event is created


-Different data collections (maskotas, events, locations, animators, report)

    -Maskot model {
        -Availability
        -Quantity
        -Name
        -Used[{date}]
    }
    -Event model {
        -Date 
        -Location 
        -Maskotas [(ref)]
        -Animators [(ref)]
        -Price
        -Who collected the money (ref)
        -Confirmation by animator (ref)
        -Organizator {name, number, social}
    }
    -Location model {
        -Link (from google maps)
        -Name
        -Number
        -Address
    }
    -Animator {
        -Full name
        -Username
        -Number
        -Email
        -Password
        -Paycheck
        -Money collected
        -Events (ref)
    }

Technologies:
    MERN stack
    Front:
        -React router
        -Context API
        -CSS 
        -Axios
        -Yup
    Back:
        -REST api
        -Helmet
        -Morgan
        -Yup




